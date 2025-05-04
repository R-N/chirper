<?php
namespace App\Enums\Traits;

trait SerializableEnum
{
    public function jsonSerialize(): string
    {
        return $this->name;
    }
}
