import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ChallengeBox } from '../components/ChallengeBox';

import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';

import styles from '../styles/pages/Home.module.css';

interface HomeProps {
  level: number,
  currentExperience: number,
  challengesCompleted: number
}

export default function Home(props) {

  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      {/*ATENÇÃO PARA A DEPENDÊNCIA ENTRE CountdownProvider e Challenges Provider.
      O Countdown depende do challenge:
      const { startNewChallenge } = useContext(ChallengesContext);
      Então, o ChallengesProvider precisa estar por volta do CountdownProvider, e não o contrário.
      A ORDEM AQUI É IMPORTANTE. */}
      <div className={styles.container}>
        <Head>
          <title>
            Início | move.it
          </title>
        </Head>
        
        <ExperienceBar />

        <CountdownProvider>
          {/*Os componentes Countdown e ChallengeBox usam o contexto do Countdown. */}
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
        
      </div>
    </ChallengesProvider> 
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => { //nome do método precisa ser esse.
  //Prepara algumas props no servidor Node.js do Next para serem usados pelo front-end.
  //Aqui, eu posso pegar dados de cookies para que sejam indexados por search engines.
  const {level, currentExperience, challengesCompleted} = ctx.req.cookies;

  return {
    props: {
      //os dados dos cookies vem em formato de texto,
      //por isso devo convertê-los para número.
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}