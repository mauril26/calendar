/**
 * Defines the set of tests to verify the reminder memory provider implementation.
 */

import 'mocha';
import { expect } from 'chai';

import ReminderBuilder from '../src/builder';
import { Reminder } from '../src/reminder';
import MemoryReminder from '../src/providers/memory';

describe('In memory reminder repository', () => {
  let builder: ReminderBuilder;
  let repository: MemoryReminder;
  let originalReminder: Reminder;

  beforeEach(() => {
    const testingDate = new Date('2000-01-01 00:00:00');
    const color = { R: 0, G: 0, B: 0 };

    repository = new MemoryReminder();
    builder = new ReminderBuilder();

    builder.setDescription('The testing description');
    builder.setDateTime(testingDate);
    builder.setCity('Testing city');
    builder.setColor(color);

    originalReminder = builder.build();
  });

  it('should store a given reminder', () => {
    const testingDate = new Date('2000-01-01 00:00:00');
    const color = {R: 0, G: 0, B: 0};

    builder.setDescription('The testing description');
    builder.setDateTime(testingDate);
    builder.setCity('Testing city');
    builder.setColor(color);

    const reminder = builder.build();
    expect(repository.create(reminder)).to.not.be.empty;
  });

  it('should store a reminder twice (stored with a new id)', () => {
    const testingDate = new Date('2000-01-01 00:00:00');
    const color = {R: 0, G: 0, B: 0};

    builder.setDescription('The testing description');
    builder.setDateTime(testingDate);
    builder.setCity('Testing city');
    builder.setColor(color);

    const reminder = builder.build();
    expect(repository.create(reminder)).to.not.be.empty;
    expect(repository.create(reminder)).to.not.throw;
  });

  it('should remove a reminder given an id', () => {
    const id = repository.create(originalReminder);

    expect(repository.delete(id)).to.be.true;
  });

  it('should not remove a not existent reminder', () => {
    const id = 'testing id';

    expect(repository.delete(id)).to.not.be.true;
  });

  it('should update a given reminder if exists', () => {
    const testingDate = new Date('2000-01-01 00:00:00');
    const color = {R: 0, G: 0, B: 0};

    builder.setDescription('The original description');
    builder.setDateTime(testingDate);
    builder.setCity('Testing city');
    builder.setColor(color);

    const originalReminder = builder.build();
    const id = repository.create(originalReminder);

    builder.setDescription('The updated description');
    builder.setDateTime(testingDate);
    builder.setCity('Testing city');
    builder.setColor(color);
    
    const updatedReminder = builder.build();
    expect(repository.update(id, updatedReminder)).to.be.true;
    expect(updatedReminder.description).to.equal('The updated description');
  });

  it('should get a previously stored reminder given an id', () => {
    const id = repository.create(originalReminder)

    const reminder = repository.getById(id);

    expect(reminder.description).to.equal(originalReminder.description);
  });

  it('should get undefined when a not previously store id is given', () => {
    const id = 'testing id';

    const reminder = repository.getById(id);

    expect(reminder).to.equal(undefined);
  });

  it('should get a collection of reminders given a valid description', () => { 
    const description = 'testing';

    repository.create(originalReminder);
    const reminders = repository.getByDescription(description);

    expect(reminders).to.be.an('array').that.is.not.empty;
    expect(reminders.length).to.equal(1);
  });

  it('should get an empty collection given an invalid description', () => { 
    const description = 'qwerty';
    repository.create(originalReminder);

    const reminders = repository.getByDescription(description);

    expect(reminders).to.be.an('array').that.is.empty;
  });

  it('should get a collection of reminders given a valid initial date', () => {
    repository.create(originalReminder);
    const initialDate = new Date('1999-01-01 00:00:00');

    const reminders = repository.getByDate(initialDate);

    expect(reminders).to.be.an('array').that.is.not.empty;
    expect(reminders.length).to.equal(1);
  });

  it('should get an empty collection given an invalid date', () => {
    repository.create(originalReminder);
    const initialDate = new Date('2001-01-01 00:00:00');

    const reminders = repository.getByDate(initialDate);

    expect(reminders).to.be.an('array').that.is.empty;
  });

  it('should get a collection of reminders given valid initial and ending dates', () => {
    repository.create(originalReminder);
    const initialDate = new Date('1999-01-01 00:00:00');
    const endingDate = new Date('2001-01-01 00:00:00');

    const reminders = repository.getByDate(initialDate, endingDate);

    expect(reminders).to.be.an('array').that.is.not.empty;
    expect(reminders.length).to.equal(1);
  });

  it('should get an empty collection given invalid initial and ending dates', () => {
    repository.create(originalReminder);
    const initialDate = new Date('1998-01-01 00:00:00');
    const endingDate = new Date('1999-01-01 00:00:00');

    const reminders = repository.getByDate(initialDate, endingDate);

    expect(reminders).to.be.an('array').that.is.empty;
  });

  it('should get a collection of reminders given a valid city name', () => { 
    const cityName = 'Testing city';

    repository.create(originalReminder);
    const reminders = repository.getByCityName(cityName);

    expect(reminders).to.be.an('array').that.is.not.empty;
    expect(reminders.length).to.equal(1);
  });

  it('should get an empty collection given an invalid city name', () => { 
    const cityName = 'qwerty';
    repository.create(originalReminder);

    const reminders = repository.getByCityName(cityName);

    expect(reminders).to.be.an('array').that.is.empty;
  });

  it('should get a collection of reminders given a valid color', () => {
    const color = { R: 0, G: 0, B: 0 };

    repository.create(originalReminder);
    const reminders = repository.getByColor(color);

    expect(reminders).to.be.an('array').that.is.not.empty;
    expect(reminders.length).to.equal(1);
  });
  
  it('should get an empty collection given an invalid color', () => {
    const color = { R: 255, G: 255, B: 255 };

    repository.create(originalReminder);
    const reminders = repository.getByColor(color);

    expect(reminders).to.be.an('array').that.is.empty;
  });
});
