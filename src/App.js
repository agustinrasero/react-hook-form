import { set, useForm } from "react-hook-form";
import validarCEL from "./validarCEL";

function App() {
  /*
  register: para guardar los datos
  handleSubmit: para enviar los datos,  recibe una funcion
  formState: para los errores
  watch: permite ver a tiempo real lo que escribimos en los inputs
  setFocus: focus al input
  resetField: Vacia los inputs
   */
  const {register,handleSubmit, formState:{errors},watch,setFocus,resetField} = useForm();  //register para cada input, handleSubmit para el boton

  const obtenerValores = (data) =>{   //funcion al apretar el boton 
    console.table(data)
    resetField('nombre')
    setFocus('nombre')

  }
  return (
    <>

    <form onSubmit={handleSubmit(obtenerValores)}>
      <div className="pregunta">
        <label htmlFor="nombre">Nombre</label>
        <input id="nombre" placeholder="Tu Nombre" autoFocus {...register('nombre',
          {
            required:true,
            maxLength:15
          }
        )}/>
      </div>
      {errors.nombre?.type === 'required' && <div className="aviso">El campo nombre es obligatorio</div> /*?: Ejectua si existe un valor*/}
      {errors.nombre?.type === 'maxLength' && <div className="aviso">El nombre no puede tener mas de 15 caracteres</div> /*?: Ejectua si existe un valor*/}

      <div className="pregunta">
        <label htmlFor="edad">Edad</label>
        <input className='numerico' id="edad" type="number" placeholder="Tu Edad" autoFocus {...register('edad',
          {
            required:true,
            min:1,
            max:120
          }
        )}/>
      </div>
      {errors.edad?.type === 'min' && <div className="aviso">El valor minimo es 1</div> /*?: Ejectua si existe un valor*/}
      {errors.edad?.type === 'max' && <div className="aviso">El valor maximo es 120</div> /*?: Ejectua si existe un valor*/}
      {errors.edad?.type === 'required' && <div className="aviso">El campo edad es obligatorio</div> /*?: Ejectua si existe un valor*/}
      

      <div className="pregunta">
        <label htmlFor="email">E-mail</label>
        <input id="email" placeholder="TuEmail@gmail.com" autoFocus {...register('email',
          {
            pattern: /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/ //expresion regular: para validar que lo que ingresemos sea un correo
          }
        )}/>
      </div>
      {errors.email?.type === 'pattern' && <div className="aviso">El correo electronio tiene una sintaxis erronea</div>}

      <div className="pregunta">
        <label htmlFor="telefono">Teléfono</label>
        <input className='numerico' id="telefono" type='number' placeholder="Tu Telefono" autoFocus {...register('telefono',
          {
            validate: validarCEL
          }
        )}/>
      </div>
      {errors.telefono?.type === 'validate' && <div className="aviso">El telefono no es de las varillas o supera el limite de numeros</div>}

      <div className="pregunta">
        <input type="submit"/>
      </div>
    </form>
    <div>
      {
        watch('nombre') && <div className="resumen">Me llamo <strong>{watch('nombre')}</strong>
        {
          watch('edad') && <span> y tengo años <strong>{watch('edad')}</strong> años,</span>
        }
        {
          watch('email') && <span> mi email es <strong>{watch('email')}</strong></span>
        }
        {
          watch('telefono') && <span> y por ultimo mi telefono es <strong>{watch('telefono')}</strong></span>
        }
       
        </div>
        
      }
    </div>
    
    </>
  );
}

export default App;
