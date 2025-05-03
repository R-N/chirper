<?php

namespace App\Support;

class Decimal
{
    public const POW = 2;

    public const MUL = 100;

    public function __construct(public int $cents) {}

    public static function fromFloat(float $value): self
    {
        return new self((int) round($value * self::MUL));
    }

    public function toFloat(): float
    {
        return $this->cents / self::MUL;
    }

    public static function fromDatabase($value)
    {
        // If the value is an integer (cents), convert it back to a Decimal
        if (is_int($value)) {
            return new Decimal($value);
        }
        // If it's a float (though unlikely, as it should be rounded and stored as an integer), we can still convert it
        elseif (is_float($value)) {
            return new Decimal((int) round($value * Decimal::MUL));
        }
        // If it's a string, we convert it to float and then to Decimal
        elseif (is_string($value)) {
            return new Decimal((int) round((float) $value * Decimal::MUL));
        }

        throw new \InvalidArgumentException('Invalid type for Decimal');
    }

    public static function toDatabase($amount)
    {
        // If the value is a Decimal instance, store its cents value (int)
        if ($amount instanceof Decimal) {
            return $amount->cents;
        }
        // If it's a float, we assume it's the decimal number and convert it to cents
        elseif (is_float($amount)) {
            return round($amount * Decimal::MUL);
        }
        // If it's a string, we also convert it (if needed)
        elseif (is_string($amount)) {
            return (int) round((float) $amount * Decimal::MUL);
        }
        throw new \InvalidArgumentException('Invalid type for Decimal');
    }

    public function __toString(): string
    {
        return number_format($this->toFloat(), self::POW);
    }

    // Addition: Add two Decimal instances or a Decimal and a numeric value
    public function __add($value): self
    {
        if ($value instanceof Decimal) {
            return new self($this->cents + $value->cents);
        }

        // Handle addition with numeric values (int or float)
        if (is_numeric($value)) {
            return new self($this->cents + (int) round($value * self::MUL));
        }

        throw new \InvalidArgumentException('Invalid type for addition');
    }

    // Subtraction: Subtract a Decimal instance or numeric value from another
    public function __sub($value): self
    {
        if ($value instanceof Decimal) {
            return new self($this->cents - $value->cents);
        }

        // Handle subtraction with numeric values (int or float)
        if (is_numeric($value)) {
            return new self($this->cents - (int) round($value * self::MUL));
        }

        throw new \InvalidArgumentException('Invalid type for subtraction');
    }

    // Multiplication: Multiply Decimal by an integer or float
    public function __mul($value): self
    {
        if (is_numeric($value)) {
            return new self($this->cents * (int) round($value));
        }

        throw new \InvalidArgumentException('Invalid type for multiplication');
    }

    // Division: Divide Decimal by an integer or float
    public function __div($value): self
    {
        if (is_numeric($value)) {
            return new self(intdiv($this->cents, (int) round($value)));
        }

        throw new \InvalidArgumentException('Invalid type for division');
    }

    // Equality: Simulate `==` for Decimal and numeric values
    public function __eq($value): bool
    {
        if ($value instanceof Decimal) {
            return $this->cents === $value->cents;
        }

        // Compare with numeric values
        if (is_numeric($value)) {
            return $this->cents === (int) round($value * self::MUL);
        }

        throw new \InvalidArgumentException('Invalid type for equality comparison');
    }

    // Inequality: Simulate `!=` for Decimal and numeric values
    public function __neq($value): bool
    {
        if ($value instanceof Decimal) {
            return $this->cents !== $value->cents;
        }

        // Compare with numeric values
        if (is_numeric($value)) {
            return $this->cents !== (int) round($value * self::MUL);
        }

        throw new \InvalidArgumentException('Invalid type for inequality comparison');
    }

    // Less than: Simulate `<` for Decimal and numeric values
    public function __lt($value): bool
    {
        if ($value instanceof Decimal) {
            return $this->cents < $value->cents;
        }

        // Compare with numeric values
        if (is_numeric($value)) {
            return $this->cents < (int) round($value * self::MUL);
        }

        throw new \InvalidArgumentException('Invalid type for less-than comparison');
    }

    // Less than or equal to: Simulate `<=` for Decimal and numeric values
    public function __lte($value): bool
    {
        if ($value instanceof Decimal) {
            return $this->cents <= $value->cents;
        }

        // Compare with numeric values
        if (is_numeric($value)) {
            return $this->cents <= (int) round($value * self::MUL);
        }

        throw new \InvalidArgumentException('Invalid type for less-than-or-equal comparison');
    }

    // Greater than: Simulate `>` for Decimal and numeric values
    public function __gt($value): bool
    {
        if ($value instanceof Decimal) {
            return $this->cents > $value->cents;
        }

        // Compare with numeric values
        if (is_numeric($value)) {
            return $this->cents > (int) round($value * self::MUL);
        }

        throw new \InvalidArgumentException('Invalid type for greater-than comparison');
    }

    // Greater than or equal to: Simulate `>=` for Decimal and numeric values
    public function __gte($value): bool
    {
        if ($value instanceof Decimal) {
            return $this->cents >= $value->cents;
        }

        // Compare with numeric values
        if (is_numeric($value)) {
            return $this->cents >= (int) round($value * self::MUL);
        }

        throw new \InvalidArgumentException('Invalid type for greater-than-or-equal comparison');
    }
}
