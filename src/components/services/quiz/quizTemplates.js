export const people = [
  {
    attribute: 'height',
    reference: 'name',
    question: function(reference) {
      return `What is the height of ${reference}?`;
    },
  },
  {
    attribute: 'hair_color',
    reference: 'name',
    question: function(reference) {
      return `What is the hair color of ${reference}?`;
    },
  },
  {
    attribute: 'mass',
    reference: 'name',
    question: function(reference) {
      return `How heavy is ${reference}?`;
    },
  },
  {
    attribute: 'eye_color',
    reference: 'name',
    question: function(reference) {
      return `What is the eye color of ${reference}?`;
    },
  },
];

export const films = [
  {
    attribute: 'director',
    reference: 'title',
    question: function(reference) {
      return `Who directed ${reference}?`;
    },
  },
  {
    attribute: 'release_date',
    reference: 'title',
    question: function(reference) {
      return `When was ${reference} released?`;
    },
  },
  {
    attribute: 'episode_id',
    reference: 'title',
    question: function(reference) {
      return `${reference} is which episode number?`;
    },
  },
];
