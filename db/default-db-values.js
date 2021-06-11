module.exports.defaultComments = [
	{
		_id: '123',
		avatar: '../images/avatar1.png',
		name: 'John  Doe',
		comment: 'Your blog is awesomeeeeee!!!!!',
		createdAt: '11/4/2013 10:01PM',
	},
	{
		_id: '124',
		avatar: '../images/avatar2.png',
		name: 'Jammy  Doe',
		comment: 'I have truly enjoyed this, thank you!',
		createdAt: '11/4/2013 10:02PM',
	},
	{
		_id: '125',
		avatar: '../images/avatar3.png',
		name: 'Jane  Doe',
		comment: 'if you want amazing content, you better subscribe to this!',
		createdAt: '11/4/2013 10:03PM',
	},
];

module.exports.defaultBlog = {
	_id: '126',
	categories: ['good', 'junk', 'Southern'],
	logo: '../images/default.jpeg',
	featuredTitle: 'MY FIRST TITLE',
	featuredContent:
		'Come and see how awesome my blog is I promise that you will love it!',
	aboutMyself: 'I have not yet written about myself, come and check later : )',
	contactMeMessage:
		'Give me a minute I am working in something really awesome! ',
	youtubeShow: 'checked',
	youtubeUrl: 'https://www.youtube.com/',
	instagramShow: 'checked',
	instagramUrl: 'https://www.instagram.com/',
	facebookShow: 'checked',
	facebookUrl: 'https://www.facebook.com/',
	twitterShow: 'checked',
	twitterUrl: 'https://www.twitter.com/',
	pinterestShow: 'checked',
	pinterestUrl: 'https://www.pinterest.com/',
	contactInfo: 'This is the Contact Message',
	featuredImage: '../images/default.jpeg',
	profileImage: '../images/default.jpeg',
	mediaFeedEmbed: '',
	mediaFeedTitle: '',
	paypalButton: '',
	paypalButtonComment: '',
	paypalButtonTitle: '',
};

module.exports.defaultPosts = [
	{
		_id: '127',
		category: [],
		postContent: 'Checkout My first Post',
		title: 'Do you want to see come cool content? ; )',
		postImage: '/images/logo.jpeg',
		created: '12/25/0000 00:00',
		Content:
			'<h4>I am sorry, I have not yet made my first real post, in the mean time, however, <br> enjoy the photo of this puppy <img src="/images/puppy.jpg"></h4> ',
		//         "content" : `<p>
		//         The Word Became Flesh
		//         <br><br>
		// 1 In the beginning was the Word, and the Word was with God, and the Word was God. 2 He was with God in the beginning. 3 Through him all things were made; without him nothing was made that has been made. 4 In him was life, and that life was the light of all mankind. 5 The light shines in the darkness, and the darkness has not overcome[a] it.
		// <br><br>
		// 6 There was a man sent from God whose name was John. 7 He came as a witness to testify concerning that light, so that through him all might believe. 8 He himself was not the light; he came only as a witness to the light.
		// <br><br>
		// 9 The true light that gives light to everyone was coming into the world. 10 He was in the world, and though the world was made through him, the world did not recognize him. 11 He came to that which was his own, but his own did not receive him. 12 Yet to all who did receive him, to those who believed in his name, he gave the right to become children of God— 13 children born not of natural descent, nor of human decision or a husband’s will, but born of God.
		// <br><br>
		// 14 The Word became flesh and made his dwelling among us. We have seen his glory, the glory of the one and only Son, who came from the Father, full of grace and truth.
		// <br><br>
		// 15 (John testified concerning him. He cried out, saying, “This is the one I spoke about when I said, ‘He who comes after me has surpassed me because he was before me.’”) 16 Out of his fullness we have all received grace in place of grace already given. 17 For the law was given through Moses; grace and truth came through Jesus Christ. 18 No one has ever seen God, but the one and only Son, who is himself God and[b] is in closest relationship with the Father, has made him known.
		// <br><br>
		// <h3>John the Baptist Denies Being the Messiah</h3>
		// <br><br>
		// 19 Now this was John’s testimony when the Jewish leaders[c] in Jerusalem sent priests and Levites to ask him who he was. 20 He did not fail to confess, but confessed freely, “I am not the Messiah.”
		// <br><br>
		// 21 They asked him, “Then who are you? Are you Elijah?”
		// <br><br>
		// He said, “I am not.”
		// <br><br>
		// “Are you the Prophet?”
		// <br><br>
		// He answered, “No.”
		// <br><br>
		// 22 Finally they said, “Who are you? Give us an answer to take back to those who sent us. What do you say about yourself?”
		// <br><br>
		// 23 John replied in the words of Isaiah the prophet, “I am the voice of one calling in the wilderness, ‘Make straight the way for the Lord.’”
		// <br><br>
		// 24 Now the Pharisees who had been sent 25 questioned him, “Why then do you baptize if you are not the Messiah, nor Elijah, nor the Prophet?”
		// <br><br>
		// 26 “I baptize with[e] water,” John replied, “but among you stands one you do not know. 27 He is the one who comes after me, the straps of whose sandals I am not worthy to untie.”
		// <br><br>
		// 28 This all happened at Bethany on the other side of the Jordan, where John was baptizing.
		// <br><br>
		// <h3>John Testifies About Jesus</h3>
		// <br><br>
		// 29 The next day John saw Jesus coming toward him and said, “Look, the Lamb of God, who takes away the sin of the world! 30 This is the one I meant when I said, ‘A man who comes after me has surpassed me because he was before me.’ 31 I myself did not know him, but the reason I came baptizing with water was that he might be revealed to Israel.”
		// <br><br>
		// 32 Then John gave this testimony: “I saw the Spirit come down from heaven as a dove and remain on him. 33 And I myself did not know him, but the one who sent me to baptize with water told me, ‘The man on whom you see the Spirit come down and remain is the one who will baptize with the Holy Spirit.’ 34 I have seen and I testify that this is God’s Chosen One.”[f]
		// <br><br>
		// <h3>John’s Disciples Follow Jesus</h3>
		// <br><br>
		// 35 The next day John was there again with two of his disciples. 36 When he saw Jesus passing by, he said, “Look, the Lamb of God!”
		// <br><br>
		// 37 When the two disciples heard him say this, they followed Jesus. 38 Turning around, Jesus saw them following and asked, “What do you want?”
		// <br><br>
		// They said, “Rabbi” (which means “Teacher”), “where are you staying?”
		// <br><br>
		// 39 “Come,” he replied, “and you will see.”
		// <br><br>
		// So they went and saw where he was staying, and they spent that day with him. It was about four in the afternoon.
		// <br><br>
		// 40 Andrew, Simon Peter’s brother, was one of the two who heard what John had said and who had followed Jesus. 41 The first thing Andrew did was to find his brother Simon and tell him, “We have found the Messiah” (that is, the Christ). 42 And he brought him to Jesus.
		// <br><br>
		// <h3>Jesus looked at him and said, “You are Simon son of John. You will be called Cephas” (which, when translated, is Peter).</h3>
		// <br><br>
		// <h3>Jesus Calls Philip and Nathanael</h3>
		// <br><br>
		// 43 The next day Jesus decided to leave for Galilee. Finding Philip, he said to him, “Follow me.”
		// <br><br>
		// 44 Philip, like Andrew and Peter, was from the town of Bethsaida. 45 Philip found Nathanael and told him, “We have found the one Moses wrote about in the Law, and about whom the prophets also wrote—Jesus of Nazareth, the son of Joseph.”
		// <br><br>
		// 46 “Nazareth! Can anything good come from there?” Nathanael asked.
		// <br><br>
		// “Come and see,” said Philip.
		// <br><br>
		// 47 When Jesus saw Nathanael approaching, he said of him, “Here truly is an Israelite in whom there is no deceit.”
		// <br><br>
		// 48 “How do you know me?” Nathanael asked.
		// <br><br>
		// Jesus answered, “I saw you while you were still under the fig tree before Philip called you.”
		// <br><br>
		// 49 Then Nathanael declared, “Rabbi, you are the Son of God; you are the king of Israel.”
		// <br><br>
		// 50 Jesus said, “You believe[h] because I told you I saw you under the fig tree. You will see greater things than that.” 51 He then added, “Very truly I tell you,[i] you[j] will see ‘heaven open, and the angels of God ascending and descending on’[k] the Son of Man.”
		//         </p>`,
	},
];

module.exports.defaultSubscribers = [
	{
		_id: '1234',
		name: 'John Doe',
		email: 'Johndoe@example.com',
		subscribedOn: '11/24/2021 10:01',
	},
	{
		_id: '1235',
		name: 'Jammy Doe',
		email: 'Jammydoe@example.com',
		subscribedOn: '11/24/2021 10:01',
	},
	{
		_id: '1236',
		name: 'Jane Doe',
		email: 'janedoe@example.com',
		subscribedOn: '11/24/2021 10:01',
	},
];

module.exports.defaultUser = {
	username: 'myuser',
	password: '1234',
};
