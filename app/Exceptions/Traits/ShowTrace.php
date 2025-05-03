<?php

namespace App\Exceptions\Traits;

trait ShowTrace
{
    public bool $trace = true;

    public function shouldShowTrace()
    {
        return $this->trace;
    }

    public function setShowTrace($trace)
    {
        $this->trace = $trace;

        return $this;
    }
}
