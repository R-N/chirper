<?php

namespace App\Exceptions\Traits;

use App\Utils\ExceptionUtil;

trait Displayable
{
    public bool $show = true;

    public function shouldShow()
    {
        return $this->show;
    }

    public function setShow($show)
    {
        $this->show = $show;

        return $this;
    }

    public function toArray($request)
    {
        return ExceptionUtil::toArray($request);
    }
}
