<?php

namespace App\Exceptions\Traits;

trait HasTitle
{
    public $title = null;

    public function getTitle()
    {
        return $this->title;
    }

    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }
}
