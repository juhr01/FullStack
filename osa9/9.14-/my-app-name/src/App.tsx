import Content from './components/Content'
import Header from './components/Header'
import Total from './components/Total'

const App = () => {

  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName}/>
      <Content name={courseParts[0].name} count={courseParts[0].exerciseCount}/>
      <Content name={courseParts[1].name} count={courseParts[1].exerciseCount}/>
      <Content name={courseParts[2].name} count={courseParts[2].exerciseCount}/>
      <Total total='Number of exercises' count={totalExercises}/>
    </div>
  );
};

export default App;