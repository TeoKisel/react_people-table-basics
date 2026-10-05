import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';
import classNames from 'classnames';

type Props = {
  people: Person[];
};

export const People: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  // console.log(slug);

  return (
    <tbody>
      {people.map(person => (
        <tr
          className={classNames({
            'has-background-warning': person.slug === slug,
          })}
          key={person.slug}
          data-cy="person"
        >
          <td>
            <Link
              className={classNames({ 'has-text-danger': person.sex === 'm' })}
              to={`/people/${person.slug}`}
            >
              {person.name}
            </Link>
          </td>
          <td>{person.sex}</td>
          <td>{person.born}</td>
          <td>{person.died}</td>
          <td>
            {person.mother ? (
              <Link
                className={classNames({
                  'has-text-danger': person.sex === 'm',
                })}
                to={`/people/${person.mother.slug}`}
              >
                {/* Питання person.mother.name  */}
                {person.mother.name}
              </Link>
            ) : (
              <span
                className={classNames({
                  'has-text-danger': person.sex === 'm',
                })}
              >
                {person.motherName}
              </span>
            )}
          </td>
          <td>
            {person.father ? (
              <Link to={`/people/${person.father.slug}`}>
                {person.fatherName}
              </Link>
            ) : (
              person.fatherName || '-'
            )}
          </td>
        </tr>
      ))}
    </tbody>
  );
};
