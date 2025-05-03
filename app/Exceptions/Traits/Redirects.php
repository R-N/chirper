<?php

namespace App\Exceptions\Traits;

trait Redirects
{
    public $redirect = null;

    public function shouldRedirect()
    {
        return $this->redirect;
    }

    public function getRedirect()
    {
        return $this->redirect;
    }

    public function setRedirect($redirect)
    {
        $this->redirect = $redirect;

        return $this;
    }
}
