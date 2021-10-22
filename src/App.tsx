import { useContext } from 'react';
import styles from './App.module.scss';
import { LoginBox } from './components/LoginBox';
import { MessageList } from './components/MessageList';
import { SendMessageForm } from './components/SendMessageForm';
import { AuthContext } from './contexts/auth';

/**
 * IMPORTANTE!
 * No react não é permitido o uso de hífen, só usa-se o padrão camelCase.
 */

export function App() {
  const { user } = useContext(AuthContext);
  return (
    /**
     * Usa-se o "styles." que vem do arquivo App.modules.css, pois esse padrão
     * simplesmente acopla o CSS ao componente, não ficando misturado, é criado
     * exclusivamente para o componente, mesmo se mais quem um componente usar a mesma classe
     * "contentWrapper", ambos não usarão do mesmo CSS, o module.css irá gerar separadamente e cada um terá o seu.
     * Um não vai impactar no outro. Isso é bom, porque podemos se perder no meio de tantas 
     * estilizações se o app começar a crescer. 
     * 
     * No react tudo se baseia-se em componentes, cada pedaçinho de nossa aplicação é um componente.
     * * */
    <main className={`${styles.contentWrapper} ${!!user ? styles.contentSigned : ''}`}>
      <MessageList />
        { !!user ? <SendMessageForm /> : <LoginBox /> }
    </main>
  )
}