<?php

namespace App\Exceptions;

use App\Exceptions\Traits\Displayable;
use App\Exceptions\Traits\HasErrorCode;
use App\Exceptions\Traits\Redirects;
use Exception;
use JsonSerializable;
use App\Enums\Traits\SerializableEnum;

enum BackupExceptionCode implements JsonSerializable
{
    use SerializableEnum;

    case FAILED;
    case NOT_FOUND;
    case DB_DUMP_NOT_FOUND;
    case FAIL_OPEN_ZIP;
    case RESTORE_FAILED;

    public function statusCode()
    {
        return match ($this) {
            self::FAILED => 500,
            self::NOT_FOUND => 404,
            self::DB_DUMP_NOT_FOUND => 404,
            self::FAIL_OPEN_ZIP => 500,
            self::RESTORE_FAILED => 500,
        };
    }

    public function getMessage()
    {
        return match ($this) {
            self::FAILED => 'backup.failed',
            self::NOT_FOUND => 'backup.not_found',
            self::DB_DUMP_NOT_FOUND => 'backup.db_dump_not_found',
            self::FAIL_OPEN_ZIP => 'backup.fail_open_zip',
            self::RESTORE_FAILED => 'backup.restore_failed',
        };
    }
}

class BackupException extends Exception
{
    use Displayable;
    use HasErrorCode;
    use Redirects;

    public function __construct(BackupExceptionCode $code, $data = true, $message = null, $title = null)
    {
        $this->setErrorCode($code);
        parent::__construct($message ?? $this->getErrorMessage($data));
        $this->setTitle($title ?? $this->getTitle());
    }
}
