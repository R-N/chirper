<?php

namespace App\Exceptions\Traits;

trait HasStatus
{
    public $status = null;

    public function getStatus()
    {
        return $this->status;
    }

    public function setStatus($status)
    {
        $this->status = $status;

        return $this;
    }
}
