import React from 'react';
import './App.css';

interface Validator {
  validate(level: string, week: string, lesson: string): boolean;
}

interface SelectorProps {
  cards: Card[];
  onSelectionChanged: (validator: Validator) => void;
}

const numberSorter = (a: string, b: string) => Number.parseInt(a) - Number.parseInt(b);

const Selector = (props: SelectorProps) => {
  const [level, setLevel] = React.useState('all');
  const [week, setWeek] = React.useState('all');
  const [lesson, setLesson] = React.useState('all');

  const [levels, setLevels] = React.useState([] as string[]);
  const [weeks, setWeeks] = React.useState([] as string[]);
  const [lessons, setLessons] = React.useState([] as string[]);

  React.useEffect(() => {
    const newLevels = new Set<string>();
    const newWeeks = new Set<string>();
    const newLessons = new Set<string>();

    for (const card of props.cards) {
      newLevels.add(card.level);
      newWeeks.add(card.week);
      newLessons.add(card.lesson);
    }

    setLevels(Array.from(newLevels).sort(numberSorter));
    setWeeks(Array.from(newWeeks).sort(numberSorter));
    setLessons(Array.from(newLessons).sort(numberSorter));
  }, [ props.cards ]);

  const checkValue = (actual: string, expected: string) => {
    if (expected.toLowerCase() === 'all') {
      return true;
    }
    return actual === expected;
  };

  const notifyOfValidatorChange = (expectedLevel: string, expectedWeek: string, expectedLesson: string) => {
    const newValidator: Validator = {
      validate: (actualLevel: string, actualWeek: string, actualLesson: string) => {
        return checkValue(actualLevel, expectedLevel) &&
          checkValue(actualWeek, expectedWeek) &&
          checkValue(actualLesson, expectedLesson);
      }
    };
    props.onSelectionChanged(newValidator);
  };

  return (
    <div style={{ marginTop: '1em', marginLeft: 'auto', marginRight: 'auto', width: 'fit-content' }}>
      <span>Level:</span>
      <select value={level} onChange={event => {
        const val = event.target.value;
        setLevel(val);
        notifyOfValidatorChange(val, week, lesson);
      }}>
        <option value='all'>All</option>
        {
          levels.map(it => <option key={it} value={it}>{it}</option>)
        }
      </select>
      <br/>
      <span className='label'>Week:</span>
      <select value={week} onChange={event => {
        const val = event.target.value;
        setWeek(val);
        notifyOfValidatorChange(level, val, lesson);
      }}>
        <option value='all'>All</option>
        {
          weeks.map(it => <option key={it} value={it}>{it}</option>)
        }
      </select>
      <br/>
      <span className='label'>Lesson:</span>
      <select value={lesson} onChange={event => {
        const val = event.target.value;
        setLesson(val);
        notifyOfValidatorChange(level, week, val);
      }}>
        <option value='all'>All</option>
        {
          lessons.map(it => <option key={it} value={it}>{it}</option>)
        }
      </select>
    </div>
  );
}

interface Card {
  chinese: string;
  pinyin: string;
  english: string;
  level: string;
  week: string;
  lesson: string;
}

const INPUT = `
HSK: 4; Week: 1; Lesson: 1
1.::首都::shǒudū::n.::capital 
2.::活动::huódònɡ               ::v./n.::activity 
3.::肯定::kěndìnɡ::adj./adv.::sure;definitely 
4.::提前::tíqián::v.::in advance 
5.::出发::chūfā::v.::leave;start off 
6.::堵车::dǔchē::v.::traffic jam 
7.::乘坐::chénɡzuò::v.::to take (car,airplane… ) 
8.::等(等)::děnɡ（děnɡ）::aux.::and so on 
9.::交通工具::jiāotōnɡ ɡōngjù::n.::vehicle;means of transport 
10.::广播::ɡuǎnɡbō::n.::broadcast 
11.::按照::ànzhào::prep.::according to 
12.::提醒::tíxǐng::v.::to remind 
13.::确实::quèshí::adv.::indeed 
14.::难受::nánshòu::adj.::uncomfortable 
15.::凉快::liánɡkuɑi::adj.::cool(weather) 
16.::行::xínɡ::v./adj.::ok;capable 
17.::顺便::shùnbiàn::adv.::in passing; on one’s way
18.::杂志::zázhì::n.::magazine

HSK: 4; Week: 1; Lesson: 2
1.::  速度:: sùdù::　n.::  speed 
2.::  甚至:: shènzhì::   conj.::  even to the extent that 
3.::  节约:: jiéyuē::　v.::  to save 
4.::  距离:: jùlí::　n.::  distance 
5.::  公里:: ɡōnglǐ::　M.::kilometre 
6.::  因此:: yīncǐ::　conj.::  therefore 
7.::  气候:: qìhòu::　n.::  climate 
8.::  区别:: qūbié::　n.::  difference 
9.::  温度:: wēndù::　n.::  temperature 
10.::  差不多:: chàbuduō ::　adv./adj.::  almost 
11.::  暖和:: nuǎnhuo::　adj.::  warm 
12.::  叶子:: yèzi::　n.::  leaf 
13.::  不过:: búɡuò  ::　conj.::  but;however 
14.::  可惜:: kěxī ::　adj.:: It's a pity;unfortunately 
15.::  抱歉:: bàoqiàn ::　adj.::  sorry,excuse me 
16.::  本来:: běnlái::　adv.::  originally，essentially  
17.::  篇:: piān ::　M.::a piece of (writing) 
18.::  材料:: cáiliào::　n.::  material 
19.::  遍:: biàn ::　M.::time;(for action) once through
20.::  交:: jiāo ::     v.::  to hand over 

HSK: 4; Week: 1; Lesson: 3
1.::各:: ɡè ::　pron.::  each 
2.::  导游:: dǎoyóu::　n.::  guide 
3.::  集合:: jíhé::    v.::  to gather 
4.::  京剧:: jīnɡjù::    n.::  Beijing opera 
5.::  座位:: zuòwèi ::　n.::  seat 
6.::  联系:: liánxì ::　v.::  to contact 
7.::  报名:: bàomínɡ::　v.::  to sign up 
8.::  家具:: jiājù::　n.::  furniture 
9.::  并且:: bìnɡqiě ::　conj.::  and;also 
10.::  价格:: jiàɡé ::　n.::  price 
11.::  值得:: zhídé::　v.:: be worth 
12.::  考虑:: kǎolǜ ::::　v.:: to consider  
13.::  难道:: nándào ::　adv.:: used to reiterate   a rhetorical question 
14.::  严重:: yánzhònɡ::　adj.:: serious 
15.::  擦:: cā ::　v.:: to scratch 
16.::  恐怕:: kǒnɡpà ::   adv.:: be afraid of 

HSK: 4; Week: 1; Lesson: 4
1.::允许::yǔnxǔ ::::　v.::to allow 
2.::无论::wúlùn ::::　conj.::whether;no matter what 
3.::危险::wēixiǎn::　adj.::dangerous 
4.::情况::qínɡkuànɡ ::　n.::situation 
5.::稍微::shāowēi::　adv.::slightly 
6.::方面::fānɡmiàn ::　n.::aspect 
7.::左右::zuǒyòu ::　n.::about;or so 
8.::云::yún::　n.::cloud 
9.::照::zhào::     v.::to photograph 
10.::质量::zhìliànɡ::　n.:: quality 
11.::剩::shènɡ::　v.:: be left over 
12.::加油站::jiāyóuzhàn::　n.:: gas station 
13.::大概::dàɡài::　adv.:: probably 
14.::来不及::láibují::　v.::there's not enough time 
15.::航班::hánɡbān ::　n.::flight 
16.::来得及::láidejí ::　v.::there is still time 

HSK: 4; Week: 1; Lesson: 5
1.::随着::suízhe ::prep.::along  with 
2.::科学::kēxué::n.::science 
3.::技术::jìshù::n.::technology 
4.::发展::fāzhǎn ::v.::to develop 
5.::原来::yuánlái::adv./adj.::original;former 
6.::寄::jì ::v.::to send 
7.::网站::wǎnɡzhàn::n.::website 
8.::任何::rènhé::pron.::any 
9.::消息::xiāoxi :: n.::news;message 
10.::直接::zhíjiē ::adj.::direct 
11.::交流::jiāoliú ::v.::to communicate 
12.::地球::dìqiú ::n.::the earth 
13.::海洋::hǎiyánɡ ::n.::ocean 
14.::到底::dàodǐ ::::adv.::on earth 
15.::方向::fānɡxiànɡ::n.::direction 
16.::估计::ɡūjì ::::v.::estimate 
17.::表演::biǎoyǎn::n./v.::perform 
18.::场::chǎnɡ ::::M.::scene  

HSK: 4; Week: 2; Lesson: 1
1.::生意::shēnɡyi ::n.::business 
2.::一切::yíqiè::n.　::everything 
3.::信心::xìnxīn ::n.　::confidence 
4.::沙发::shāfā ::n.　::sofa 
5.::底::dǐ ::n.::bottom 
6.::打折::dǎzhé ::v.　::discount 
7.::平时::pínɡshí ::n.　::ordinary times 
8.::流行::liúxínɡ ::v.　::popular 
9.::受不了::shòu bù liǎo ::vp.::can not bear  
10.::逛::ɡuànɡ::v.::stroll 
11.::辛苦::xīnkǔ::adj.　::hard 
12.::正好::zhènɡhǎo ::adj./adv.　:: just in time;just right 
13.::台::tái::M.::measur word for a machine 

HSK: 4; Week: 2; Lesson: 2
1.::竞争::jìnɡzhēnɡ::n./v.　::compete 
2.::压力::yālì ::n.　::pressure 
3.::相同::xiānɡtónɡ ::adj.　::same;equal 
4.::顾客::ɡùkè ::n.::customer 
5.::符合::fúhé ::v.::accord with 
6.::计划::jìhuà::n./v.::plan 
7.::专门::zhuānmén ::adv.::specialized 
8.::材料::cáiliào::n.::material 
9.::不仅::bùjǐn ::conj.::not only 
10.::陪::péi::v.　::to accompany 
11.::袜子::wàzi ::n.::socks 
12.::吃惊::chījīnɡ  ::adj.::be shocked 
13.::竟然::jìnɡrán ::adv.::unexpectedly 

HSK: 4; Week: 2; Lesson: 3
1.::葡萄酒::pútɑojiǔ ::n.::wine 
2.::味道::wèidào ::n.::taste 
3.::艺术品::yìshùpǐn::n.　::work of art 
4.::吸引::xīyǐn ::v.　::to attract 
5.::富::fù ::adj.　::rich 
6.::穷::qiónɡ::adj.　::poor 
7.::作者::zuòzhě::n.　::author 
8.::父亲::fùqin ::n.　::father 
9.::看法::kànfǎ ::n.::view 
10.::完全::wánquán::adv.　::completely 
11.::使::shǐ ::v.　::make; cause; enable 
12.::接受::jiēshòu:: v.::to accept 
13.::而::ér ::conj.　::but;while 
14.::招聘::zhāopìn ::v.::to recruit 
15.::好像::hǎoxiànɡ::adv.::seem 
16.::挺::tǐnɡ ::adv.::very 
17.::适合::shìhé::v.::to fit 
18.::工资::ɡōnɡzī ::n.::wages 

HSK: 4; Week: 2; Lesson: 4
1.::部分::bùfen ::n.::part 
2.::经济::jīnɡjì ::n.::economics 
3.::困难::kùnnɑn ::n.::difficulty 
4.::获得::huòdé ::v.　::to get 
5.::尊重::zūnzhònɡ::v.　::to respect 
6.::实在::shízɑi::adv.::really 
7.::谈::tán ::v.::to talk 
8.::要是::yàoshì::conj.::If 
9.::输::shū::v.::lost 
10.::掉::diào::v.　::fall;off 
11.::样子::yànɡzi ::n.　::appreance 
12.::保证::bǎozhènɡ :: v.::ensure 
13.::棒::bànɡ::adj.　::excellent 
14.::够::ɡòu ::v.::enough 

HSK: 4; Week: 2; Lesson: 5
1.::刚刚::ɡānɡɡānɡ ::adv.　::just 
2.::社会::shèhuì::n.　::society 
3.::赚::zhuàn ::v.　::to earn 
4.::奖金::jiǎnɡjīn::n.　::bonus 
5.::实际上::shíjìshɑnɡ::adv.　::In fact 
6.::正确::zhènɡquè ::adj.　::correct 
7.::重点::zhònɡdiǎn ::n.::key point 
8.::丰富::fēnɡfù ::adj.::rich 
9.::经验::jīnɡyàn ::n.::experience 
10.::例如::lìrú::v.::for example 
11.::与::yǔ ::prep./conj.　::with;and 
12.::方法::fānɡfǎ ::n.　::method 
13.::积累::jīlěi::v.::accumulate 
14.::专业::zhuānyè::n.::major 
15.::知识::zhīshi::n.::knowledge 
16.::职业::zhíyè::n.::occupation 
17.::态度::tàidù::n.::attitude 
18.::收入::shōurù::n.　::income 
19.::  丢:: diū::v.::  to lose 
`;

function getCards(input: string) {
  const result: Card[] = [];
  const lines = input.split('\n');
  var level = '';
  var week = '';
  var lesson = '';
  for (const line of lines) {
    if (line.startsWith('HSK')) {
      const parts = line.split(';');
      level = parts[0].replace('HSK:', '').trim();
      week = parts[1].replace('Week:', '').trim();
      lesson = parts[2].replace('Lesson:', '').trim();
    } else if (line.replace(' ', '').length === 0) {
      continue;
    } else {
      const parts = line.split('::');
      const chinese = parts[1];
      const pinyin = parts[2];
      const english = parts[4];
      result.push({
        chinese,
        pinyin,
        english,
        level,
        week,
        lesson
      });
    }
  }
  return result;
};

const ALL_CARDS = getCards(INPUT);

function shuffle(arr: Card[]): Card[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}


function App() {
  const [validator, setValidator] = React.useState({
    validate: () => true
  } as Validator);
  const [cards, setCards] = React.useState([] as Card[]);
  const [index, setIndex] = React.useState(0);
  const [showEnglish, setShowEnglish] = React.useState(false);
  const [startWithChinese, setStartWithChinese] = React.useState(true);
  const [random, setRandom] = React.useState(false);

  React.useEffect(() => {
    const newCards: Card[] = [];
    const cards = random ? shuffle(getCards(INPUT)) : ALL_CARDS;
    for (const card of cards) {
      if (!card.chinese || !card.english ||
          !card.pinyin) {
        console.error('Invalid card: ', card);
      }
      if (validator.validate(card.level, card.week, card.lesson)) {
        newCards.push(card);
      }
    }
    setCards(newCards);
  }, [validator, random]);

  return (
    <div style={{ marginLeft: 'auto', marginRight: 'auto', width: 'fit-content' }}>
      <Selector cards={ALL_CARDS}
                onSelectionChanged={validator => setValidator(validator)}/>
      <div style={{ paddingTop: '1ex', marginLeft: 'auto', marginRight: 'auto', width: 'fit-content' }}>
        Test English:
        <input style={{ marginLeft: '1em', scale: '200%' }}
               type='checkbox' checked={startWithChinese}
              onChange={(event) => {
                setStartWithChinese(!startWithChinese);
                setShowEnglish(startWithChinese);
              }}></input>
      </div>
      <div style={{ paddingTop: '1ex', marginLeft: 'auto', marginRight: 'auto', width: 'fit-content' }}>
        Random:
        <input style={{ marginLeft: '1em', scale: '200%' }}
               type='checkbox' checked={random}
              onChange={(event) => {
                setRandom(!random);                
              }}></input>
      </div>
      {
        (index >= 0 && index < cards.length) ? (
          <div style={{ textAlign: 'center' }}
               onClick={() => setShowEnglish(!showEnglish)}>
          {
            <div style={{ fontSize: '300%', padding: '1ex' }}>
              {
                showEnglish ? (<div>
                  {cards[index].english}
                  </div>) : (
                  <div>
                    <div>
                      {cards[index].chinese}
                    </div>
                    <div>
                      {cards[index].pinyin}
                    </div>
                  </div>)
              }
            </div>
          }
          </div>
        ) : null
      }
      <div style={{ marginLeft: 'auto', marginRight: 'auto', width: 'fit-content'}}>
      <button disabled={index <= 0}
              onClick={() => {
          setShowEnglish(!startWithChinese);
          setIndex(index - 1);
        }}>Prev</button>
        <button disabled={index >= cards.length - 1}
                onClick={() => {
          setShowEnglish(!startWithChinese);
          setIndex(index + 1);
        }}>Next</button>
      </div>
    </div>
  );
}

export default App;
