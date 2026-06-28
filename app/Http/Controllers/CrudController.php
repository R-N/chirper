<?php

namespace App\Http\Controllers;

use App\Models\Traits\HasRelationshipEntities;
use App\Utils\ExportUtil;
use App\Utils\ResponseUtil;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

abstract class CrudController extends Controller
{
    protected $modelClass;

    protected $resourcePagePath;

    protected $routeBase;

    protected $translationKey;

    protected $hasRelationshipEntities = false;

    protected $mayExport = false;

    protected $userOwned = false;

    public function __construct()
    {
        if (! $this->translationKey) {
            $this->translationKey = $this->lowerName();
        }
        $this->hasRelationshipEntities = in_array(HasRelationshipEntities::class, class_uses($this->modelClass));
    }

    public function index(Request $request)
    {
        if ($this->mayExport && $request->query('export_type')) {
            return $this->export();
        }
        $items = $this->modelClass::query2();

        return ResponseUtil::jsonInertiaResponse([
            'items' => $items,
        ], $this->resourcePagePath.'/Index');
    }

    public function store(Request $request)
    {
        $validated = $this->modelClass::validateRequest($request);
        $validated = $this->beforeCreate($validated, $request);
        if ($this->userOwned) {
            $item = $request->user()->{$this->pluralName()}()->create($validated);
        } else {
            $item = $this->modelClass::create($validated);
        }
        if ($this->hasRelationshipEntities) {
            $item->loadEntities();
        }

        return ResponseUtil::jsonRedirectResponse([
            'message' => __($this->translationKey.'.created'),
            'item' => $item,
        ], route($this->routeBase.'.index'), 201, true);
    }

    public function show($id)
    {
        $item = $this->modelClass::findOrFail($id);
        if ($this->hasRelationshipEntities) {
            $item->loadEntities();
        }

        return ResponseUtil::jsonInertiaResponse([
            'item' => $item,
        ], $this->resourcePagePath.'/Show');
    }

    public function update(Request $request, $id)
    {
        $item = $this->findItem($request, $id);
        $validated = $this->modelClass::validateRequest($request, true, $id);
        $validated = $this->beforeUpdate($validated, $request, $item);
        $item->update($validated);
        $item->save();
        if ($this->hasRelationshipEntities) {
            $item->loadEntities();
        }

        return ResponseUtil::jsonRedirectResponse([
            'message' => __($this->translationKey.'.updated'),
            'item' => $item,
        ], route($this->routeBase.'.index'));
    }

    public function destroy(Request $request, $id)
    {
        $item = $this->findItem($request, $id);
        $item->delete();

        return ResponseUtil::jsonRedirectResponse([
            'message' => __($this->translationKey.'.deleted'),
        ], route($this->routeBase.'.index'));
    }

    /**
     * Hook: mutate validated data before create. Override to handle
     * uploads or derived fields without reimplementing store().
     */
    protected function beforeCreate(array $validated, Request $request): array
    {
        return $validated;
    }

    /**
     * Hook: mutate validated data before update. $item is the existing record.
     */
    protected function beforeUpdate(array $validated, Request $request, $item): array
    {
        return $validated;
    }

    /**
     * Resolve a single record, scoped to the current user when $userOwned.
     * Prevents IDOR on update/destroy of user-owned resources.
     */
    protected function findItem(Request $request, $id)
    {
        if ($this->userOwned) {
            return $request->user()->{$this->pluralName()}()->findOrFail($id);
        }

        return $this->modelClass::findOrFail($id);
    }

    protected function lowerName()
    {
        return strtolower(class_basename($this->modelClass));
    }

    protected function pluralName()
    {
        return Str::plural($this->lowerName());
    }

    public function export(string $type = 'xlsx')
    {
        return ExportUtil::export($this->modelClass, $type);
    }

    public function bulkDestroy(Request $request)
    {
        $table = $this->modelClass::TABLE;

        $data = $request->validate([
            'ids' => 'required|array',
            'ids.*' => "exists:{$table},id",
        ]);

        if ($this->userOwned) {
            $request->user()->{$this->pluralName()}()->whereIn('id', $data['ids'])->delete();
        } else {
            $this->modelClass::whereIn('id', $data['ids'])->delete();
        }

        return ResponseUtil::jsonRedirectResponse([
            'message' => __($this->translationKey.'.deleted'),
        ], route($this->routeBase.'.index'));
    }
}
