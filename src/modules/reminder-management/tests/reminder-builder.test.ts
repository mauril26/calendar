/**
 * Defines the set of tests to verify the behavior of the reminder builder.
 */

import 'mocha';
import { expect } from 'chai';

import ReminderBuilder from '../src/builder';

describe('Reminder builder', () => {

  it('should build a valid reminder given a valid set of values', () => {
    const builder = new ReminderBuilder();
    const testingDate = new Date('2000-01-01 00:00:00');
    const color = {R: 0, G: 0, B: 0};

    builder.setDescription('The testing description');
    builder.setDateTime(testingDate);
    builder.setCity('Testing city');
    builder.setColor(color);

    const reminder = builder.build();

    expect(reminder.description).to.equal('The testing description');
    expect(reminder.dateTime).to.equal(testingDate);
    expect(reminder.city).to.equal('Testing city');
    expect(reminder.color).to.equal(color);
  });

  it('should build a valid reminder given a 30 long characters description', () => {
    const builder = new ReminderBuilder();
    const just30Chars = 'Lorem ipsum dolor sit amet, co';
    const testingDate = new Date('2000-01-01 00:00:00');
    const color = {R: 0, G: 0, B: 0};

    builder.setDescription(just30Chars);
    builder.setDateTime(testingDate);
    builder.setCity('Testing city');
    builder.setColor(color);

    const reminder = builder.build();

    expect(reminder.description).to.equal(just30Chars);
    expect(reminder.dateTime).to.equal(testingDate);
    expect(reminder.city).to.equal('Testing city');
    expect(reminder.color).to.equal(color);
  });

  it('should throw an error when an empty description is given', () => {
    const builder = new ReminderBuilder();
    const color = {R: 0, G: 0, B: 0};

    builder.setDescription('');
    builder.setDateTime(new Date());
    builder.setCity('Testing city');
    builder.setColor(color);

    expect(() => builder.build()).to.throw('Empty description is not supported');
  });

  it('should throw an error when no description is given', () => {
    const builder = new ReminderBuilder();
    const color = {R: 0, G: 0, B: 0};

    // builder.setDescription('The testing description');
    builder.setDateTime(new Date());
    builder.setCity('Testing city');
    builder.setColor(color);

    expect(() => builder.build()).to.throw('Empty description is not supported');
  });

  it('should throw an error when the description is longer than 30 characters', () => {
    const builder = new ReminderBuilder();
    const aLongLongDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor';
    const color = {R: 0, G: 0, B: 0};

    builder.setDescription(aLongLongDescription);
    builder.setDateTime(new Date());
    builder.setCity('Testing city');
    builder.setColor(color);

    expect(() => builder.build()).to.throw('Descriptions longer than 30 chars are not supported');
  });

  it('should assign the current date when no date/time is given', () => {
    const builder = new ReminderBuilder();
    const color = {R: 0, G: 0, B: 0};

    builder.setDescription('The testing description');
    // builder.setDateTime(testingDate);
    builder.setCity('Testing city');
    builder.setColor(color);

    const reminder = builder.build();

    expect(reminder.dateTime.getDay()).to.equal(new Date().getDay());
    expect(reminder.dateTime.getMonth()).to.equal(new Date().getMonth());
    expect(reminder.dateTime.getFullYear()).to.equal(new Date().getFullYear());
  });

  it('should throw an error when no city name is given', () => {
    const builder = new ReminderBuilder();
    const color = {R: 0, G: 0, B: 0};

    builder.setDescription('The testing description');
    builder.setDateTime(new Date());
    //builder.setCity('Testing city');
    builder.setColor(color);

    expect(() => builder.build()).to.throw('Empty city name is not supported');
  });

  it('should assign white (255, 255, 255) as the default color when no color is given', () => {
    const builder = new ReminderBuilder();

    builder.setDescription('The testing description');
    builder.setDateTime(new Date());
    builder.setCity('Testing city');
    //builder.setColor(color);

    const reminder = builder.build();

    expect(reminder.color.R).to.equal(255);
    expect(reminder.color.G).to.equal(255);
    expect(reminder.color.B).to.equal(255);
  });
});
