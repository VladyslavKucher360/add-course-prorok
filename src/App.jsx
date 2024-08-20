import { useState } from 'react';
import './App.css';
import { RxCross2 } from "react-icons/rx";

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
  skillsDeveloped: "",
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
  place: "",
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
  imageId: 0,
  logInCourseLink: "",
};

const App = () => {
  const [course, setCourse] = useState(courseObject);
  const [tokenToAdd, setTokenToAdd] = useState('');
  const [popUp, setPopUp] = useState(false);

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

  const handlePopUp = () => {
    setPopUp(!popUp);
  }

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
      handlePopUp();
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
          <input className='p-1 border border-lightBeige focus:outline-none focus:border focus:border-bronze' type="text" name="name" value={course.name} onChange={handleChange} />
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border-2 rounded border-bronze flex-wrap max-w-[1000px]'>
          <label className='font-semibold text-xl'>siteLink</label>
          <input className='p-1 border border-lightBeige focus:outline-none focus:border focus:border-bronze' type="text" name="siteLink" value={course.siteLink} onChange={handleChange} />
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border-2 rounded border-bronze flex-wrap max-w-[1000px]'>
          <label className='font-semibold text-xl'>courseLink</label>
          <input className='p-1 border border-lightBeige focus:outline-none focus:border focus:border-bronze' type="text" name="courseLink" value={course.courseLink} onChange={handleChange} />
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
          <input className='p-1 border border-lightBeige focus:outline-none focus:border focus:border-bronze' type="datetime-local" name="creationDate" value={course.creationDate} onChange={handleChange} />
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border-2 rounded border-bronze flex-wrap max-w-[1000px]'>
          <label className='font-semibold text-xl'>creatorsContact</label>
          <input className='p-1 border border-lightBeige focus:outline-none focus:border focus:border-bronze' type="text" name="creatorsContact" value={course.creatorsContact} onChange={handleChange} />
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border-2 rounded border-bronze flex-wrap max-w-[1000px]'>
          <label className='font-semibold text-xl'>minPrice</label>
          <input className='p-1 border border-lightBeige focus:outline-none focus:border focus:border-bronze' type="number" name="minPrice" value={course.minPrice} onChange={handleChange} />
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border-2 rounded border-bronze flex-wrap max-w-[1000px]'>
          <label className='font-semibold text-xl'>maxPrice</label>
          <input className='p-1 border border-lightBeige focus:outline-none focus:border focus:border-bronze' type="number" name="maxPrice" value={course.maxPrice} onChange={handleChange} />
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border-2 rounded border-bronze flex-wrap max-w-[1000px]'>
          <label className='font-semibold text-xl'>ratingOnGoogle</label>
          <input className='p-1 border border-lightBeige focus:outline-none focus:border focus:border-bronze' type="number" name="ratingOnGoogle" value={course.ratingOnGoogle} onChange={handleChange} />
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border-2 rounded border-bronze flex-wrap max-w-[1000px]'>
          <label className='font-semibold text-xl'>marketingDescription</label>
          <textarea className='p-1 border border-lightBeige focus:outline-none focus:border focus:border-bronze' name="marketingDescription" value={course.marketingDescription} onChange={handleChange} />
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border-2 rounded border-bronze flex-wrap max-w-[1000px]'>
          <label className='font-semibold text-xl'>forAIDescription</label>
          <textarea className='p-1 border border-lightBeige focus:outline-none focus:border focus:border-bronze' name="forAIDescription" value={course.forAIDescription} onChange={handleChange} />
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
          <textarea className='p-1 border border-lightBeige focus:outline-none focus:border focus:border-bronze' name="benefitsOfCourse" value={course.benefitsOfCourse} onChange={handleChange} />
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border-2 rounded border-bronze flex-wrap max-w-[1000px]'>
          <label className='font-semibold text-xl'>trainingTopics</label>
          <textarea className='p-1 border border-lightBeige focus:outline-none focus:border focus:border-bronze' name="trainingTopics" value={course.trainingTopics} onChange={handleChange} />
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border-2 rounded border-bronze flex-wrap max-w-[1000px]'>
          <label className='font-semibold text-xl'>skillsDeveloped</label>
          <textarea className='p-1 border border-lightBeige focus:outline-none focus:border focus:border-bronze' name="skillsDeveloped" value={course.skillsDeveloped} onChange={handleChange} />
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border-2 rounded border-bronze flex-wrap max-w-[1000px]'>
          <label className='font-semibold text-xl'>startDate</label>
          <input className='p-1 border border-lightBeige focus:outline-none focus:border focus:border-bronze' type="datetime-local" name="startDate" value={course.startDate} onChange={handleChange} />
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border-2 rounded border-bronze flex-wrap max-w-[1000px]'>
          <label className='font-semibold text-xl'>groupSize</label>
          {renderCheckboxList('groupSize', course.groupSize)}
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border-2 rounded border-bronze flex-wrap max-w-[1000px]'>
          <label className='font-semibold text-xl '>place</label>
          <input className='p-1 border border-lightBeige focus:outline-none focus:border focus:border-bronze' type="string" name="place" value={course.place} onChange={handleChange} />
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
          <textarea className='p-1 border border-lightBeige focus:outline-none focus:border focus:border-bronze' name="becomeAfterTraining" value={course.becomeAfterTraining} onChange={handleChange} />
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border-2 rounded border-bronze flex-wrap max-w-[1000px]'>
          <label className='font-semibold text-xl'>levelOfAdvancement</label>
          {renderCheckboxList('levelOfAdvancement', course.levelOfAdvancement)}
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border-2 rounded border-bronze flex-wrap max-w-[1000px]'>
          <label className='font-semibold text-xl'>imageId</label>
          <input className='p-1 border border-lightBeige focus:outline-none focus:border focus:border-bronze' type="number" name="imageId" value={course.imageId} onChange={handleChange} />
        </div>

        <div className='bg-lightBeige p-2 w-max flex gap-4 mb-2 border-2 rounded border-bronze flex-wrap max-w-[1000px]'>
          <label className='font-semibold text-xl'>logInCourseLink</label>
          <input className='p-1 border border-lightBeige focus:outline-none focus:border focus:border-bronze' type="string" name="logInCourseLink" value={course.logInCourseLink} onChange={handleChange} />
        </div>

        <button className='bg-bronze py-2 px-4 rounded text-white' type="submit" onClick={() => updateCourse()}>Submit</button>
      </form>
      {popUp && (
        <div className='fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#f5e6cf55] backdrop-blur-sm flex items-center justify-center z-30'>
          <div className='bg-white p-6 rounded-lg w-[60vw] h-max shadow-2xl'>
            <div className='w-full border-b border-lightBeige flex justify-end'>
              <RxCross2
                className='w-5 h-5 cursor-pointer mb-2'
                onClick={() => handlePopUp()}
              />
            </div>

            <div className='text-xl font-semibold'>
              <h1>Course was added.</h1>
              <h1>Below you can check a course object.</h1>
              <h1>In console log you can check responce data.</h1>
            </div>

            <div className="h-[70vh] overflow-y-auto border-2 border-bronze p-2 mt-2">
              {Object.entries(course).map(([key, value]) => (
                <div key={key} className="mb-2">
                  <strong className="capitalize">{key}:</strong>
                  <div className="pl-2">
                    {Array.isArray(value) ? (
                      value.map((item, index) => (
                        <div key={index}>
                          {typeof item === 'object' ? (
                            <div>
                              {Object.entries(item).map(([subKey, subValue]) => (
                                <div key={subKey}>
                                  <span className="capitalize">{subKey}:</span> {subValue}
                                </div>
                              ))}
                            </div>
                          ) : (
                            item.toString()
                          )}
                        </div>
                      ))
                    ) : (
                      value.toString()
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className='w-full flex justify-end'>
              <div className='py-1 px-4 bg-bronze text-white rounded cursor-pointer mt-2'>
                Close
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
