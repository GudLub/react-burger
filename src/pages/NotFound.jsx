import {
    Button,
  } from "@ya.praktikum/react-developer-burger-ui-components";
  import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div style={{
            display: 'flex', 
            flexDirection: 'column',
            // marging: 'auto',
            alignContent: 'center',
            // justifyContent: 'center',
            paddingTop: 180}}>
        <h2 className='text text_type_main-large'>Страница не найдена</h2>
        <Link to={"/"}>
            <Button htmlType="button" type="secondary" size="small">
              Назад к бургерам
            </Button>
          </Link>
    </div>
        )
}

export default NotFound;