<?php

namespace App\Exceptions\Traits;

trait HasStatusCode
{
  public function getStatusCode()
  {
    if (property_exists($this, 'statusCode') && $this->statusCode) {
      return $this->statusCode;
    }
    return 500;
  }

  public function setStatusCode($statusCode)
  {
    $this->statusCode = $statusCode;
    return $this;
  }
}
