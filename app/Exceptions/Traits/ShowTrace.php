<?php

namespace App\Exceptions\Traits;

trait ShowTrace
{
    public bool $showTrace = true;

    public function shouldShowTrace()
    {
        return $this->showTrace;
    }

    public function setShowTrace($showTrace)
    {
        $this->showTrace = $showTrace;

        return $this;
    }
}
