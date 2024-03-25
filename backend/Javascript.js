// node --version # Should be >= 18
// npm install @google/generative-ai

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = "AIzaSyDYVBxKM3d0AtWG0xlgKNpENjsdiLVp2k8";

async function runChat() {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
    ],
  });
  
 

  const result = await chat.sendMessage("Provide me Summary in English Language of following : " + para);
  const response = result.response;
  console.log(response.text());
}

const para =  `
article, the less is the amount of labour rystalised in that ariel, and the les i ts value; and ice versa, the less the produetiveness of labour, the greater is the labour time requited for the production of an article, and the greater is its value. The valuc of a commodity, therefor, varies
ireily asthe quantity, and inversely as the produetiveness, of the labour incorporated ini.

A thing can be a use valu, without having value. Tis isthe case whenever its utility to man is
not due to labour. Such are air, vggin sol, natural meadows, &c. A thing ean be useful, and the
product of human labour, without being a commodity. Whoever directly satisis his wants with
the produce of his own labour, creates, indeed, use values, but not commodities. In otder 10
produce the later, he mast not only produce ute values, but use vals for others, social use
Values. (And not only for others, without more. The mediaeval peasant produced quitrent-comn
for his feudal lord and tthe-com for his parson. But neither the quit-tent-corn nor the tthe-corn
became commodities by reason ofthe fact that they had been produced for others. To become a
commodity product must be transferred to another, whom it will serve as a use value, by means
of an exchange.) Lastly nothing ean have value, without being an abject of uty. the thing is
useless, so isthe labour contained in it; the abour does not count as labour, and therefore ereates
no value,

Section 2: The Two-fold Character of the Labour Embodied in

Commodities
A first sight a commodity presented itself 10 us as a complex of two things ~ use value and
exchange value. Later on, we saw also that labour, too, possesses the same two-fold nature; for,
so faras it finds expression in valu, it does not posses the same characteristics that belong to it
asa creator of use values. Twas the first to point out and to examine eritically this two-fold nature
of the labour contained in commodities. As this point isthe pivot on which # clear comprehension
of political economy turns, we must go more into det
Let us take two commodities such as coat and 10 yards of linen, and Tet the former be double
the value of the latter, so that, i 10 yards a linen = W, the coat= 2.
The coat isa use value that satisfies a particular want. Its existence isthe result ofa special sort of
productive activity, the nature of which is determined by its aim, mode of operation, subject,
means, and result. The labour, whose utility i ths represented by the value in use ofits product,
or which manifests itself by making its product a use valuc, we call useful labour. In this
connection we consider only its usefil effet.
As the coat and the linen are two qualitatively different use values, so also are the two forms of
labour that produce them, tailoring and weaving. Were these two objects not qualitatively
different, not produeed respectively by labour of different quality, they could not stand to each
father in the relation of commodities. Coats are not exchanged Tor coals, one use value is not
exchanged for another ofthe same kind.
To all the different varieties of values in use there eerespond as many diferent kinds of useful
Tabour, classified according tothe order genus, species, and variety to which they belong in the
socal division of labour, This division of labour is @ necessary condition forthe production of
commodities, but it does not follow, conversely, that the production of commodities is a
necessary condition forthe division of labour. Inthe primitive Indian community there i socal
division of labour, without production of commodities. Or, to take an example nearer home, in
every factory the labour is divided according to a system, but this division isnot brousht about by
the operatives mutually exchanging thei individual products, Only such produets ean become
`;

runChat(para);