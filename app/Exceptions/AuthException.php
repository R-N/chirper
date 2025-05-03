<?php

namespace App\Exceptions;

use App\Exceptions\Traits\Displayable;
use App\Exceptions\Traits\HasErrorCode;
use App\Exceptions\Traits\HasStatus;
use App\Exceptions\Traits\Redirects;
use Illuminate\Auth\AuthenticationException;

enum AuthExceptionCode
{
    case BAD_REQUEST;
    case EMAIL_ALREADY_VERIFIED;
    case INVALID_TOKEN;
    case PASSWORD_RESET_SEND_FAIL;
    case USER_NOT_FOUND;
    case TOKEN_EXPIRED;

    public function statusCode()
    {
        return match ($this) {
            self::BAD_REQUEST => 400,
            self::EMAIL_ALREADY_VERIFIED => 403,
            self::INVALID_TOKEN => 403,
            self::PASSWORD_RESET_SEND_FAIL => 500,
            self::USER_NOT_FOUND => 404,
            self::TOKEN_EXPIRED => 401,
        };
    }

    public function getMessage()
    {
        return match ($this) {
            self::BAD_REQUEST => 'errors.bad_request',
            self::EMAIL_ALREADY_VERIFIED => 'auth.email_already_verified',
            self::INVALID_TOKEN => 'errors.invalid_token',
            self::PASSWORD_RESET_SEND_FAIL => 'auth.password_reset_send_fail',
            self::USER_NOT_FOUND => 'auth.user_not_found',
            self::TOKEN_EXPIRED => 'errors.token_expired',
        };
    }
}

class AuthException extends AuthenticationException
{
    use Displayable;
    use HasErrorCode;
    use HasStatus;
    use Redirects;

    public function __construct(AuthExceptionCode $code, $data = true, $message = null, $title = null)
    {
        $this->setErrorCode($code);
        parent::__construct($message || $this->getMessage($data));
        $this->setTitle($title || $this->getTitle());
    }
}
