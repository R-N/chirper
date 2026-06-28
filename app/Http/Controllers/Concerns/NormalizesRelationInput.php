<?php

namespace App\Http\Controllers\Concerns;

use Illuminate\Http\Request;

trait NormalizesRelationInput
{
    /**
     * Coerce a relation field on the request to an array of name strings,
     * accepting either raw strings or objects with a `name` key.
     */
    protected function normalizeRelationInput(Request $request, string $field): void
    {
        if ($request->has($field)) {
            $values = $request->input($field);
            if (is_array($values)) {
                $request->merge([
                    $field => array_map(fn ($v) => is_string($v) ? $v : ($v['name'] ?? $v), $values),
                ]);
            }
        }
    }
}
