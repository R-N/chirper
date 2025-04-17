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
        // Perform the regular update
        $updated = parent::update($attributes, $options);

        if (isset($attributes['roles'])) {
            $this->syncRoles($attributes['roles']);
        }

        if (isset($attributes['permissions'])) {
            $this->syncPermissions($attributes['permissions']);
        }

        if ($emailChange) {
            $this->sendEmailVerificationNotification();
        }

        return $updated;
    }
}
