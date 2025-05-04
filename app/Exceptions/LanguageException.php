<?php

namespace App\Exceptions;

use App\Exceptions\Traits\Displayable;
use App\Exceptions\Traits\HasErrorCode;
use App\Exceptions\Traits\Redirects;
use Exception;
use JsonSerializable;
use App\Enums\Traits\SerializableEnum;

enum LanguageExceptionCode implements JsonSerializable
{
    use SerializableEnum;

    case NOT_FOUND;

    public function statusCode()
    {
        return match ($this) {
            self::NOT_FOUND => 404,
        };
    }

    public function getMessage()
    {
        return match ($this) {
            self::NOT_FOUND => 'lang.not_found',
        };
    }
}

class LanguageException extends Exception
{
    use Displayable;
    use HasErrorCode;
    use Redirects;

    public function __construct(LanguageExceptionCode $code, $data = true, $message = null, $title = null)
    {
        $this->setErrorCode($code);
        parent::__construct($message || $this->getErrorMessage($data));
        $this->setTitle($title || $this->getTitle());
    }
}
