<?php

namespace App\Exceptions;

use Exception;
use App\Exceptions\Traits\Displayable;
use App\Exceptions\Traits\HasErrorCode;
use App\Exceptions\Traits\Redirects;

enum LanguageExceptionCode
{
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
    
    public function __construct(LanguageExceptionCode $code, $data=true, $message=null)
    {
        parent::__construct($message || $this->getMessage($data));
        $this->setErrorCode($code);
    }
}
