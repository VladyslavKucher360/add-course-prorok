import { useEffect, useState } from 'react';
import './App.css';

const courseObject = {
  id: 0,
  name: "",
  siteLink: "",
  courseLink: "",
  typeOfContentList: [
    {
      id: 1,
      name: "Video"
    },
    {
      id: 2,
      name: "Article"
    },
    {
      id: 3,
      name: "Interactive"
    },
  ],
  targetGroupList: [
    {
      id: 1,
      name: "Beginners"
    },
    {
      id: 2,
      name: "Intermediates"
    },
    {
      id: 3,
      name: "Advanced"
    }
  ],
  creationDate: "2024-08-11T20:39:59.577Z",
  creatorsContact: "",
  minPrice: 0,
  maxPrice: 0,
  ratingOnGoogle: 0,
  marketingDescription: "",
  forAIDescription: "",
  trainingMode: [
    {
      id: 3,
      name: "ProduktFizyczny"
    },
    {
      id: 2,
      name: "asdasd"
    },
    {
      id: 1,
      name: "gdsasgs"
    },
    {
      id: 4,
      name: "maksmhyb"
    },
  ],
  contentCategory: [
    {
      id: 1,
      name: "Programming"
    },
    {
      id: 2,
      name: "Design"
    },
    {
      id: 3,
      name: "Marketing"
    }
  ],
  benefitsOfCourse: "",
  trainingTopics: "",
  startDate: "2024-08-11T20:39:59.577Z",
  groupSize: [
    {
      id: 1,
      name: "Small"
    },
    {
      id: 2,
      name: "Medium"
    },
    {
      id: 3,
      name: "Large"
    }
  ],
  softSkills: [
    {
      id: 1,
      name: "Communication"
    },
    {
      id: 2,
      name: "Teamwork"
    },
    {
      id: 3,
      name: "Problem Solving"
    }
  ],
  formOfKnowledge: [
    {
      id: 1,
      name: "Lecture"
    },
    {
      id: 2,
      name: "Hands-on"
    },
    {
      id: 3,
      name: "Self-study"
    }
  ],
  becomeAfterTraining: "",
  levelOfAdvancement: [
    {
      id: 1,
      name: "Beginner"
    },
    {
      id: 2,
      name: "Intermediate"
    },
    {
      id: 3,
      name: "Advanced"
    }
  ],
  imageId: 0
};

const categoriesFromApi = {
  contentCategory: {},
  formOfKnowledge: {},
  groupSize: {},
  levelOfAdvancement: {},
  softSkills: {},
  targetGroup: {},
  trainingMode: {},
  typeOfContent: {},
};

const App = () => {
  const [course, setCourse] = useState(courseObject);
  const [tokenToAdd, setTokenToAdd] = useState('');

  const updateCourseWithApiCategories = (catFromApi) => {
    const mapApiCategories = (apiCategory) => {
      return Object.keys(apiCategory).map((key) => ({
        id: apiCategory[key],
        name: key,
      }));
    };

    setCourse((prevCourse) => ({
      ...prevCourse,
      contentCategory: mapApiCategories(catFromApi.contentCategory),
      formOfKnowledge: mapApiCategories(catFromApi.formOfKnowledge),
      groupSize: mapApiCategories(catFromApi.groupSize),
      levelOfAdvancement: mapApiCategories(catFromApi.levelOfAdvancement),
      softSkills: mapApiCategories(catFromApi.softSkills),
      targetGroupList: mapApiCategories(catFromApi.targetGroup),
      typeOfContentList: mapApiCategories(catFromApi.typeOfContent),
      trainingMode: mapApiCategories(catFromApi.trainingMode),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({
      ...course,
      [name]: value
    });
  };

  const handleChangeToken = (e) => {
    setTokenToAdd(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(course);
  };

  const handleCheckboxChange = (e, key, item) => {
    const { checked } = e.target;
    const updatedList = course[key].map((i) =>
      i.id === item.id ? { ...i, checked: !i.checked } : i
    );

    setCourse({
      ...course,
      [key]: updatedList
    });
  };

  const renderCheckboxList = (key, list) => {
    return list.map((item) => (
      <div key={item.id}>
        <label>
          <input
            type="checkbox"
            checked={!!course[key].find((i) => i.id === item.id)?.checked}
            onChange={(e) => handleCheckboxChange(e, key, item)}
          />
          <span className='ml-0.5'>{item.name}</span>
        </label>
      </div>
    ));
  };

  async function getAllCategories() {
    const url = 'https://api.prorokszkoleniowy.pl/get-all-categories';

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${tokenToAdd}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      updateCourseWithApiCategories(data);
      return data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  async function updateCourse() {
    const url = 'https://api.prorokszkoleniowy.pl/add-course';
  
    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${tokenToAdd}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(course),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Course updated successfully:', data);
      return data;
    } catch (error) {
      console.error('Error updating course:', error);
      throw error;
    }
  }

  return (
    <div className='w-[1000px] mx-auto my-12'>
      <h1 className='text-4xl mb-4'>Add course form</h1>
      <div className='bg-lightBeige p-2 w-max flex gap-4 mb-6 border-2 rounded border-bronze max-w-[1000px]'>
        <label className='font-semibold text-xl'>Token</label>
        <textarea value={tokenToAdd} onChange={handleChangeToken} type="text" className='w-[900px] p-1' rows={3} />
      </div>
      <p className='font-light'>Click button below to load categories from api</p>
      <button
        onClick={() => getAllCategories()}
        className='bg-bronze py-2 px-4 rounded text-white mb-4'
      >
        Load data
      </button>
      <form onSubmit={handleSubmit}>
        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border-2 rounded border-bronze flex-wrap max-w-[1000px]'>
          <label className='font-semibold text-xl'>name</label>
          <input className='p-1' type="text" name="name" value={course.name} onChange={handleChange} />
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border-2 rounded border-bronze flex-wrap max-w-[1000px]'>
          <label className='font-semibold text-xl'>siteLink</label>
          <input className='p-1' type="text" name="siteLink" value={course.siteLink} onChange={handleChange} />
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border-2 rounded border-bronze flex-wrap max-w-[1000px]'>
          <label className='font-semibold text-xl'>courseLink</label>
          <input className='p-1' type="text" name="courseLink" value={course.courseLink} onChange={handleChange} />
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border-2 rounded border-bronze flex-wrap max-w-[1000px]'>
          <label className='font-semibold text-xl'>typeOfContentList</label>
          {renderCheckboxList('typeOfContentList', course.typeOfContentList)}
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border-2 rounded border-bronze flex-wrap max-w-[1000px]'>
          <label className='font-semibold text-xl'>targetGroupList</label>
          {renderCheckboxList('targetGroupList', course.targetGroupList)}
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border-2 rounded border-bronze flex-wrap max-w-[1000px]'>
          <label className='font-semibold text-xl'>creationDate</label>
          <input className='p-1' type="datetime-local" name="creationDate" value={course.creationDate} onChange={handleChange} />
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border-2 rounded border-bronze flex-wrap max-w-[1000px]'>
          <label className='font-semibold text-xl'>creatorsContact</label>
          <input className='p-1' type="text" name="creatorsContact" value={course.creatorsContact} onChange={handleChange} />
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border-2 rounded border-bronze flex-wrap max-w-[1000px]'>
          <label className='font-semibold text-xl'>minPrice</label>
          <input className='p-1' type="number" name="minPrice" value={course.minPrice} onChange={handleChange} />
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border-2 rounded border-bronze flex-wrap max-w-[1000px]'>
          <label className='font-semibold text-xl'>maxPrice</label>
          <input className='p-1' type="number" name="maxPrice" value={course.maxPrice} onChange={handleChange} />
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border-2 rounded border-bronze flex-wrap max-w-[1000px]'>
          <label className='font-semibold text-xl'>ratingOnGoogle</label>
          <input className='p-1' type="number" name="ratingOnGoogle" value={course.ratingOnGoogle} onChange={handleChange} />
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border-2 rounded border-bronze flex-wrap max-w-[1000px]'>
          <label className='font-semibold text-xl'>marketingDescription</label>
          <textarea className='p-1' name="marketingDescription" value={course.marketingDescription} onChange={handleChange} />
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border-2 rounded border-bronze flex-wrap max-w-[1000px]'>
          <label className='font-semibold text-xl'>forAIDescription</label>
          <textarea className='p-1' name="forAIDescription" value={course.forAIDescription} onChange={handleChange} />
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border-2 rounded border-bronze flex-wrap max-w-[1000px]'>
          <label className='font-semibold text-xl'>trainingMode</label>
          {renderCheckboxList('trainingMode', course.trainingMode)}
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border-2 rounded border-bronze flex-wrap max-w-[1000px]'>
          <label className='font-semibold text-xl'>contentCategory</label>
          {renderCheckboxList('contentCategory', course.contentCategory)}
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border-2 rounded border-bronze flex-wrap max-w-[1000px]'>
          <label className='font-semibold text-xl'>benefitsOfCourse</label>
          <textarea className='p-1' name="benefitsOfCourse" value={course.benefitsOfCourse} onChange={handleChange} />
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border-2 rounded border-bronze flex-wrap max-w-[1000px]'>
          <label className='font-semibold text-xl'>trainingTopics</label>
          <textarea className='p-1' name="trainingTopics" value={course.trainingTopics} onChange={handleChange} />
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border-2 rounded border-bronze flex-wrap max-w-[1000px]'>
          <label className='font-semibold text-xl'>startDate</label>
          <input className='p-1' type="datetime-local" name="startDate" value={course.startDate} onChange={handleChange} />
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border-2 rounded border-bronze flex-wrap max-w-[1000px]'>
          <label className='font-semibold text-xl'>groupSize</label>
          {renderCheckboxList('groupSize', course.groupSize)}
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border-2 rounded border-bronze flex-wrap max-w-[1000px]'>
          <label className='font-semibold text-xl'>softSkills</label>
          {renderCheckboxList('softSkills', course.softSkills)}
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border-2 rounded border-bronze flex-wrap max-w-[1000px]'>
          <label className='font-semibold text-xl'>formOfKnowledge</label>
          {renderCheckboxList('formOfKnowledge', course.formOfKnowledge)}
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border-2 rounded border-bronze flex-wrap max-w-[1000px]'>
          <label className='font-semibold text-xl'>becomeAfterTraining</label>
          <textarea className='p-1' name="becomeAfterTraining" value={course.becomeAfterTraining} onChange={handleChange} />
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border-2 rounded border-bronze flex-wrap max-w-[1000px]'>
          <label className='font-semibold text-xl'>levelOfAdvancement</label>
          {renderCheckboxList('levelOfAdvancement', course.levelOfAdvancement)}
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border-2 rounded border-bronze flex-wrap max-w-[1000px]'>
          <label className='font-semibold text-xl'>imageId</label>
          <input className='p-1' type="number" name="imageId" value={course.imageId} onChange={handleChange} />
        </div>

        <button className='bg-bronze py-2 px-4 rounded text-white' type="submit" onClick={() => updateCourse()}>Submit</button>
      </form>
    </div>
  );
};

export default App;
