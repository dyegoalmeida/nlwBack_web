import { api } from '../../services/api';
import styles from './styles.module.scss';

import logoImg from '../../assets/logo.svg';
import { useEffect, useState } from 'react';

type Message = {
    /**
     * Você pode receber vários campos, porém você só declara as variaveis que irá utilizar,
     * não precisa carregar todas.
     */
    id: string;
    text: string;
    user: {
        avatar_url: string;
        name: string;
    }
};

export function MessageList(){
    /**
     * Estado é basicamente uma forma de conseguir armazenar informações dentro do componente
     * variáveis que serão manipuladas pelo componente.
     * Sempre iniciar o useState com o mesmo tipo de dado que irá salvar, exemplo:
     * useState([]), você irá salvar um array também.
     * 
     * Em um estado nós nunca alteramos o valor da variavel diretamente,
     * sempre usamos uma função para isso. Exemplo: const [messages, setMessages]
     * Existe um conceito para isso: Imutabilidade
     */
    const [messages, setMessages] = useState<Message[]>([]); //Irá armazenar um array de Message

    /**
     * As variáveis que estiverem em UseEffect, toda vez que mudarem o valor
     * ele executará a função setada no parâmetro, é isso que queremos.
     * Se caso precisar somente executar uma vez, como uma tela inicial da aplicação,
     * trazer uma lista, apenas deixe o array vazio.
     */
    useEffect(() => {
        //O retorno da chamada para a API será do tipo Message[]
        api.get<Message[]>('messages/last3').then(response => {
            setMessages(response.data);
        })
    });

    return (
       <div className={styles.messageListWrapper}>
           <img src={logoImg} alt="DoWhile 2021" />
            <ul className={styles.messageList}>
                {messages.map(message => {
                    return (
                        /**
                         * Sempre quando se usa o map no react, tem que colocar o parametro Key, 
                         * especificando a chave única que você tem para cada mensagem no caso, cada item
                         * do array.
                         */
                        <li key={message.id} className={styles.message}>
                            <p className={styles.messageContent}>{message.text}</p>
                            <div className={styles.messageUser}>
                                <div className={styles.userImage}>
                                    <img src={message.user.avatar_url} alt={message.user.name} />
                                </div>
                                <span>{message.user.name}</span>
                            </div>
                        </li>
                    );
                })}
            </ul>    
       </div>
    )
}