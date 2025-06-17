
import { MdOutlineFoodBank } from 'react-icons/md';
import styles from './Type.module.css'

const Types = () => {
    


  const icons_op = [
    { name: "Pizza", icon_ie: <MdOutlineFoodBank /> },
    { name: "Burger", icon_ie: <MdOutlineFoodBank /> },
    { name: "Sushi", icon_ie: <MdOutlineFoodBank /> },
    { name: "Dessert", icon_ie: <MdOutlineFoodBank /> },
  ];

  return (
    <>
    
    <div className={styles.container}>
      {icons_op.map((data, index) => (
        <div key={index} style={{ marginBottom: '1rem', border:"1px solid black", borderRadius:"10px" } }className={styles.divie} >
          <p>{data.icon_ie}</p>
          <p className={styles.iconsfont}>{data.name}</p>

        </div>
      ))}
    </div>
   
    </>
  );
};

export default Types;
