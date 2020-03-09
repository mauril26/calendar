/**
 * Defines the set of tests to verify the reminder memory provider implementation.
 */

import 'mocha';
import { expect } from 'chai';

import DebugForecast from '../src/providers/debug-provider-forecast';

describe('Debug provider forecast', () => {
  it('should get a single forecast given a city name', async () => {
    const provider = new DebugForecast();

    const forecast = await provider.get('Debug city');

    expect(forecast).to.be.an('array');
    expect(forecast.length).to.equal(1);
  });

  it('should get a forecast collection given a city name and a date with period', async () => {
    const provider = new DebugForecast();

    const forecast = await provider.get('Debug city', new Date(), 3);

    expect(forecast).to.be.an('array');
    expect(forecast.length).to.equal(3);
  });

  it('should get an empty forecast collection given an invalid city name', async () => {
    const provider = new DebugForecast();

    const forecast = await provider.get('Another city');

    expect(forecast).to.be.an('array');
    expect(forecast.length).to.equal(0);
  });
});
