import { useParams } from 'react-router-dom';
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
            <a
              className={classNames({ 'has-text-danger': person.sex === 'f' })}
              href={`#/people/${person.slug}`}
            >
              {person.name}
            </a>
          </td>
          <td>{person.sex}</td>
          <td>{person.born}</td>
          <td>{person.died}</td>
          <td>
            {person.mother ? (
              <a
                className={classNames({
                  'has-text-danger': person.mother.sex === 'f',
                })}
                href={`#/people/${person.mother.slug}`}
              >
                {person.mother.name}
              </a>
            ) : (
              <span
                className={classNames({
                  'has-text-danger': person.motherName,
                })}
              >
                {person.motherName ? person.motherName : '-'}
              </span>
            )}
          </td>
          <td>
            {person.father ? (
              <a href={`#/people/${person.father.slug}`}>{person.fatherName}</a>
            ) : (
              person.fatherName || '-'
            )}
          </td>
        </tr>
      ))}
    </tbody>
  );
};
