import readline from 'readline';

const prompts = readline.createInterface(process.stdin, process.stdout);

// Create a Question
prompts.question('Enter Bot type : ', (response) => {
    
	// Check the local response
	if (response.toLowerCase() == 'javascript') {
		console.log('You are right');
	} else {
		console.log('Do you even know the way.');
	}
});