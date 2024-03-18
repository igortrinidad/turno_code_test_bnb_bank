<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Support\Facades\Artisan;

abstract class TestCase extends BaseTestCase
{

    /**
     * If true, setup has run at least once.
     *
     * @var boolean
     */
    protected static $setUpRun = false;

    protected function setUp(): void
    {
        parent::setUp();

        if (!static::$setUpRun) {
            echo 'refreshing database...';
    
            Artisan::call('migrate:refresh --seed');
            
            static::$setUpRun = true;
        }

    }
}
