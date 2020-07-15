import theme from '../Styles/theme';

export const Difficulties = [
  {
    level: 1,
    message: 'Very, Very Easy',
    color: theme.colors.success[300],
  },
  {
    level: 2,
    message: 'Easy',
    color: theme.colors.success[400],
  },
  {
    level: 3,
    message: 'Moderately Easy',
    color: theme.colors.success[500],
  },
  {
    level: 4,
    message: 'Moderate',
    color: theme.colors.success[600],
  },
  {
    level: 5,
    message: 'Moderately Hard',
    color: theme.colors.warning[400],
  },
  {
    level: 6,
    message: 'Hard',
    color: theme.colors.warning[500],
  },
  {
    level: 7,
    message: 'Very Hard',
    color: theme.colors.warning[600],
  },
  {
    level: 8,
    message: 'Extremely Hard',
    color: theme.colors.danger[400],
  },
  {
    level: 9,
    message: 'Submaximal',
    color: theme.colors.danger[500],
  },
  {
    level: 10,
    message: 'Maximal',
    color: theme.colors.danger[600],
  },
];
