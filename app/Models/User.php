<?php

namespace App\Models;

use App\Filters\NotNullFilter;
use App\Models\Traits\HasColumnDefinitions;
use App\Models\Traits\HasRelationshipEntities;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Password;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Jetstream\HasProfilePhoto;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Activitylog\Traits\CausesActivity;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Permission\Traits\HasPermissions;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements MustVerifyEmail
{
    public const TABLE = 'users';

    protected $table = self::TABLE;

    use HasApiTokens;
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory;
    use HasPermissions;
    use HasProfilePhoto;

    use HasRelationshipEntities;
    use HasColumnDefinitions;

    use HasRoles;
    use Notifiable;
    use TwoFactorAuthenticatable;
    use CausesActivity;
    use LogsActivity;

    protected static array $relationshipEntities = ['roles', 'permissions'];

    public function getActivitylogOptions(): \Spatie\Activitylog\LogOptions
    {
        return \Spatie\Activitylog\LogOptions::defaults()
            ->logAll()
            ->logOnlyDirty()
            ->logExcept(['password']);
    }

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

    public static function columns()
    {
        return [
            'id' => [
                'label' => 'ID',
                'type' => 'number',
                'filter' => 'exact',
                'sort' => true,
            ],
            'name' => [
                'label' => 'Name',
                'type' => 'string',
                'filter' => 'partial',
                'sort' => true,
                'search' => true,
                'rules' => 'required|string|max:255',
            ],
            'email' => [
                'label' => 'Email',
                'type' => 'string',
                'filter' => 'partial',
                'sort' => true,
                'search' => true,
                'rules' => 'required|string|email|max:255|unique:users,email',
            ],
            'enabled' => [
                'label' => 'Enabled',
                'type' => 'bool',
                'filter' => 'exact',
                'sort' => true,
                'rules' => 'boolean',
            ],
            'verified' => [
                'label' => 'Verified',
                'type' => 'bool',
                'filter' => 'custom',
                'filter_class' => NotNullFilter::class,
                'filter_column' => 'email_verified_at',
                'sort' => true,
                'sort_column' => 'email_verified_at',
                'rules' => 'boolean',
            ],
            'roles.name' => [
                'label' => 'Roles',
                'type' => 'string',
                'filter' => 'partial',
                'sort' => 'custom:roles.name',
                'search' => 'roles->name',
                'rules' => 'string|max:255|exists:roles,name',
            ],
            'permissions.name' => [
                'label' => 'Permissions',
                'type' => 'string',
                'filter' => 'partial',
                'sort' => 'custom:permissions.name',
                'search' => 'permissions->name',
                'rules' => 'string|max:255|exists:permissions,name',
            ],
            'roles' => [
                'rules' => 'array',
            ],
            'roles.*' => [
                'rules' => 'string|max:255|exists:roles,name',
            ],
            'permissions' => [
                'rules' => 'array',
            ],
            'permissions.*' => [
                'rules' => 'string|max:255|exists:permissions,name',
            ],
            'password' => [
                'rules' => 'nullable|string|min:8|max:255|regex:/[A-Z]/|regex:/[a-z]/|regex:/[0-9]/|regex:/[@$!%*?&#]/|confirmed',
            ],
            'profile_photo_path' => [
                'rules' => 'nullable|string|max:2048|regex:/^(?!.*\.\.)(?!.*\/\/)(?!\/)[a-zA-Z0-9\/_\-\.]+(?<!\/)$/',
            ],
            'locale' => [
                'rules' => 'nullable|string|max:10',
            ],
            'email_verified_at' => [
                'rules' => 'string|max:50|date_format:Y-m-d\TH:i:s\Z',
            ],
            'created_at' => [
                'rules' => 'string|max:50|date_format:Y-m-d\TH:i:s\Z',
            ],
            'modified_at' => [
                'rules' => 'string|max:50|date_format:Y-m-d\TH:i:s\Z',
            ],
        ];
    }

    public static function defaultSort()
    {
        return ['name'];
    }

    public function getVerifiedAttribute()
    {
        return ! is_null($this->email_verified_at);
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
        if (isset($attributes['email'])) {
            $emailChange = $attributes['email'] !== $this->email;
        }

        if (isset($attributes['verified'])) {
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

    public function setVerified($verified)
    {
        if ($verified) {
            $this->email_verified_at = now();
        } else {
            $this->email_verified_at = null;
        }
    }

    public function resetPassword()
    {
        $token = Password::getRepository()->create($this);
        $this->sendPasswordResetNotification($token);
    }

    public function refreshToken()
    {
        $token = $this->currentAccessToken();
        if (isset($token->delete)) {
            $token->delete();
        }

        $newToken = $this->createToken('auth_token', ['*']);

        return $newToken;
    }
}
