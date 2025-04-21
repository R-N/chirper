<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Jetstream\HasProfilePhoto;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Spatie\Permission\Traits\HasRoles;
use Spatie\Permission\Traits\HasPermissions;
use App\Models\Traits\HasRelationshipEntities;
use Illuminate\Support\Facades\Password;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;
use App\Filters\GlobalSearch;
use App\Filters\NotNullFilter;
use App\Sorts\RelationshipField;
use App\Utils\QueryUtil;
use App\Utils\ExportUtil;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens;
    use HasRoles;
    use HasPermissions;
    use HasRelationshipEntities;

    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory;
    use HasProfilePhoto;
    use Notifiable;
    use TwoFactorAuthenticatable;

    protected static array $relationshipEntities = ["roles", "permissions"];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'enabled',
    ];
    
    protected $attributes = [
        'enabled' => true,
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_recovery_codes',
        'two_factor_secret',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array<int, string>
     */
    protected $appends = [
        'profile_photo_url',
        'verified',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function getVerifiedAttribute()
    {
        return !is_null($this->email_verified_at);
    }
    
    public function chirps(): HasMany
    {
        return $this->hasMany(Chirp::class);
    }
    
    public static function createWithRoles(array $attributes, array $options = [])
    {
        $user = self::create($attributes, $options);

        if (isset($attributes['roles'])) {
            $user->syncRoles($attributes['roles']);
        }

        if (isset($attributes['permissions'])) {
            $user->syncPermissions($attributes['permissions']);
        }

        return $user;
    }

    public function update(array $attributes = [], array $options = [])
    {
        $emailChange = false;
        if (isset($attributes['email']))
            $emailChange = $attributes['email'] !== $this->email;

        if (isset($attributes['verified'])){
            $this->setVerified($attributes['verified']);
        }
        // Perform the regular update
        $updated = parent::update($attributes, $options);

        if (isset($attributes['roles'])) {
            $this->syncRoles($attributes['roles']);
        }

        if (isset($attributes['permissions'])) {
            $this->syncPermissions($attributes['permissions']);
        }

        if ($emailChange || $this->isDirty('email')) {
            $this->email_verified_at = null;
            $this->sendEmailVerificationNotification();
        }

        return $updated;
    }

    public function setVerified($verified){
        if ($verified){
            $this->email_verified_at = now();
        }else{
            $this->email_verified_at = null;
        }
    }

    public function resetPassword(){
        // Generate a password reset token
        $token = Password::getRepository()->create($this);
        // Send the password reset notification with the token
        $this->sendPasswordResetNotification($token);
    }

    public static function query2($raw=false){
        $items = QueryBuilder::for(User::class)
            ->withEntities()
            ->allowedFilters([
                AllowedFilter::custom('search', new GlobalSearch([
                    'email', 'name', 'roles->name', 'permissions->name'
                ])),
                AllowedFilter::exact('id'),
                AllowedFilter::partial('email'),
                AllowedFilter::partial('name'),
                AllowedFilter::partial('roles.name'),
                AllowedFilter::partial('permissions.name'),
                AllowedFilter::exact('enabled'),
                AllowedFilter::custom('verified', new NotNullFilter('email_verified_at')),
            ])
            ->allowedSorts([
                'id', 'email', 'name', 'enabled', 'email_verified_at',
                AllowedSort::custom('roles.name', new RelationshipField(['roles->name'])),
                AllowedSort::custom('permissions.name', new RelationshipField(['permissions->name'])),
            ])
            ->defaultSort('name');
        if ($raw)
            return $items;
        $items = QueryUtil::paginateQuery($items);
        return $items;
    }
    public static function collection($filter=null){
        $items = self::query2(true)
            ->get()
            ->map(fn($item) => [
                'ID' => $item->id,
                'Name' => $item->name,
                'Email' => $item->email,
                'Enabled' => $item->enabled,
                'Verified' => $item->verified,
                'Roles' => implode(', ', $item->roles?->map(fn($r) => $r->name)->all()),
                'Permissions' => implode(', ', $item->permissions?->map(fn($p) => $p->name)->all()),
            ]);
        $items = ExportUtil::filter($items, $filter);
        return $items;
    }
}
