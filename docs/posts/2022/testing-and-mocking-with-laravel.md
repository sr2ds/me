# Testing and Mocking with Laravel

Working with micro-services or external services integrated, sometimes we need to simulate the behavior of some resources, for example, HTTP calls. The mock is a way to simulate this and ensure the quality of your feature without to need the external resource inside your test.

Let's to say that you have a integration with Stripe Payments and you need to test your software but don't want to create a new customer or new billings every time when you run your tests. To do it, we need mock the Stripe behavior.

In my example, I'm using the Cashier to abstract the Stripe things, because this, I created a Service called PremiumService to abstract the Cashier functions and I mocked just the PremiumService.

To simplify our life, I like to create the mocks inside some Trait to just 'enable' inside my tests, like this:

```
<?php

namespace Tests\Traits;

use App\Services\PremiumService;

trait StripeMock
{
    public function setStripeMock()
    {
        $this->mock(PremiumService::class, function ($mock) {
            $mock->shouldReceive('createAsStripeCustomer')->andReturn();
            $mock->shouldReceive('cancelProductSubscription')->andReturn();
            $mock->shouldReceive('createStripeSubscription')->andReturn($mock);
            $mock->shouldReceive('getActiveSubscriptions')->andReturn([
                ['id' => 12, 'name' => 'sub', 'items' => [['id' => 21]]],
            ]);
        })->makePartial();
    }
}
```

With this, inside my tests of stripe, I just need need import the Trait and run `$this->setStripeMock();` to 'enable' mock.

Let's to try understand the mock now.

In the first mock line `$this->mock(PremiumService::class, function ($mock)` we are creating the simulation of `PremiumService`, this way when the application initiate the Class, the mock will be used instead of real Class.


Inside of mock, we have defined the behavior about each method, like:
```
$mock->shouldReceive('createAsStripeCustomer')->andReturn();
```

It means that when call the method `createAsStripeCustomer`, the return will be void as expected in real code. But if you check the `getActiveSubscriptions`, we have a simple data returning simulating the original behavior.


To clarify more, the PremiumService is just one Class to abstract the `Cashier` methods, like this:

```
// PremiumService

public function getActiveSubscriptions(Company $company)
{
    return $company->subscriptions()->active()->get();
}

```
---

Here you can lean more about tests, I listed some good articles to help you:

https://ralphjsmit.com/laravel-mock-dependencies

https://5balloons.info/how-to-mock-objects-in-phpunit-pest-tests-in-laravel

https://medium.com/the-andela-way/mock-testing-in-laravel-4a2fe15885b8