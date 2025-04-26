<?php

namespace App\Exceptions\Traits;

use App\Exceptions\Traits\HasStatusCode;
use Exception;

trait HasErrorCode
{
  use HasStatusCode;

  public function getErrorCode()
  {
      if (property_exists($this, 'errorCode')) {
        return $this->errorCode;
      }
      if (method_exists(get_parent_class($this), 'getCode')) {
          return parent::getCode();
      }
      return null;
  }

  public function setErrorCode($errorCode)
  {
      $this->errorCode = $errorCode;
      return $this;
  }

  public function getStatusCode()
  {
    if (property_exists($this, 'statusCode') && $this->statusCode) {
      return $this->statusCode;
    }
    if (method_exists($this, 'getCode')){
      $errorCode = $this->getCode();
      if(method_exists($errorCode, 'getStatusCode')){
        return $errorCode->getStatusCode();
      }
    }
    if (method_exists(get_parent_class($this), 'getStatusCode')) {
        return parent::getStatusCode();
    }
    return 500;
  }
  public function getErrorMessage($data=null)
  {
    if (property_exists($this, 'message') && $this->message){
      if (method_exists(get_parent_class($this), 'getMessage')) {
        return parent::getMessage();
      }
      return $this->message;
    }
    if (method_exists($this, 'getCode')){
      $errorCode = $this->getCode();
      if(method_exists($errorCode, 'getMessage')){
        $message = $errorCode->getMessage();
        if (!is_array($data) || $data){
          try{
            $message = __($message, is_array($data) ? $data : []);
          }catch(Exception $e){}
        }
        return $message;
      }
    }
    if (method_exists(get_parent_class($this), 'getMessage')) {
        return parent::getMessage();
    }
    return "";
  }
}
