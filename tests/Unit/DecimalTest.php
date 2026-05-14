<?php

namespace Tests\Unit;

use App\Support\Decimal;
use InvalidArgumentException;
use PHPUnit\Framework\TestCase;

class DecimalTest extends TestCase
{
    public function test_converts_to_and_from_float_and_database_values(): void
    {
        $decimal = Decimal::fromFloat(12.345);

        $this->assertSame(1235, $decimal->cents);
        $this->assertSame(12.35, $decimal->toFloat());
        $this->assertSame(1234, Decimal::fromDatabase('12.34')->cents);
        $this->assertSame(1234, Decimal::toDatabase('12.34'));
    }

    public function test_supports_arithmetic_and_comparison_helpers(): void
    {
        $decimal = Decimal::fromFloat(10.00);

        $this->assertSame(1250, $decimal->__add(2.50)->cents);
        $this->assertSame(750, $decimal->__sub(2.50)->cents);
        $this->assertSame(2000, $decimal->__mul(2)->cents);
        $this->assertSame(500, $decimal->__div(2)->cents);
        $this->assertTrue($decimal->__eq(10.00));
        $this->assertTrue($decimal->__gt(9.99));
        $this->assertTrue($decimal->__lte(10.00));
    }

    public function test_rejects_invalid_database_values(): void
    {
        $this->expectException(InvalidArgumentException::class);

        Decimal::fromDatabase([]);
    }
}
