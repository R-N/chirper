<?php

namespace App\Exceptions;

use Exception;

class BackupException extends Exception
{
    public $show = true;

    public const BACKUP_FAILED = 1000;
    public const BACKUP_NOT_FOUND = 2000;
    public const DB_DUMP_NOT_FOUND = 2001;
    public const FAIL_OPEN_ZIP = 3000;
    public const RESTORE_FAILED = 4000;
}
