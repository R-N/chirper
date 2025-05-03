<?php

namespace App\Support;

use Illuminate\Support\Facades\Cache;

class CacherInstance
{
    protected string $prefix;

    protected string $keysList;

    protected int $ttl;

    public function __construct(string $prefix, int $ttl = 3600)
    {
        $this->prefix = $prefix;
        $this->keysList = "{$prefix}_keys";
        $this->ttl = $ttl;
    }

    public function cacheKey($key = null)
    {
        $cacheKey = $this->prefix;
        if ($key) {
            $cacheKey = $cacheKey.'_'.$key;
        }

        return $cacheKey;
    }

    public function remember($key, $default = null)
    {
        $cacheKey = $this->cacheKey($key);

        return Cache::remember($cacheKey, $this->ttl, function () use ($cacheKey, $default) {
            $this->trackKey($cacheKey);
            if ($default instanceof \Closure) {
                return $default();
            }

            return $default;
        });
    }

    public function get($key, $default = null)
    {
        return $this->remember($key, $default);
    }

    public function put($key, $value): void
    {
        $cacheKey = $this->cachekey($key);
        Cache::put($cacheKey, $value, $this->ttl);
        $this->trackKey($cacheKey);
    }

    public function forget($key = null): void
    {
        $cacheKey = $this->cachekey($key);
        Cache::forget($cacheKey);
        $this->untrackKey($cacheKey);
    }

    public function forgetAll(): void
    {
        $allKeys = Cache::get($this->keysList, []);
        foreach ($allKeys as $cacheKey) {
            Cache::forget($cacheKey);
            // $this->untrackKey($cacheKey);
        }
        Cache::forget($this->keysList);
    }

    protected function trackKey($key): void
    {
        $keys = Cache::get($this->keysList, []);
        if (! in_array($key, $keys)) {
            $keys[] = $key;
            Cache::put($this->keysList, $keys, $this->ttl);
        }
    }

    protected function untrackKey($key): void
    {
        $keys = Cache::get($this->keysList, []);
        $filtered = array_filter($keys, fn ($k) => $k !== $key);
        Cache::put($this->keysList, array_values($filtered), $this->ttl);
    }
}

class Cacher
{
    public static function remember($prefix, $key = null, $default = null)
    {
        $cacherInstance = new CacherInstance($prefix);

        return $cacherInstance->remember($key, $default);
    }

    public static function get($prefix, $key = null, $default = null)
    {
        $cacherInstance = new CacherInstance($prefix);

        return $cacherInstance->get($key, $default);
    }

    public static function put($prefix, $key, $value, $ttl = null): void
    {
        $cacherInstance = new CacherInstance($prefix);
        $cacherInstance->put($key, $value, $ttl);
    }

    public static function forget($prefix, $key = null): void
    {
        $cacherInstance = new CacherInstance($prefix);
        $cacherInstance->forget($key);
    }

    public static function forgetAll($prefix): void
    {
        $cacherInstance = new CacherInstance($prefix);
        $cacherInstance->forgetAll();
    }
}
