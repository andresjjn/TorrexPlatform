import express from 'express';
import fetch from 'node-fetch';
const router = express.Router();

router.get('/', (req, res) => {
  res.render('main', {
    page: 'Remote opportunities for you!',
    actual: ''
  });
});

router.get('/user', (req, res) => {
  res.render('user', {
    page: 'Search a user by username',
    actual: '- user',
    status: ''
  });
});

router.post('/user', (req, res) => {
  async function user (req, res) {
    const response = await fetch(`https://torre.bio/api/bios/${req.body.username}`)
      .then(res => res.json());
    if (response.message) {
      res.render('user', {
        page: 'Search a user by username',
        actual: '- user',
        status: 'The user was not found'
      });
    } else if (!response) {
      res.render('user', {
        page: 'Search a bio by username',
        actual: '- user',
        status: 'No response from API'
      });
    } else {
      res.render('bio', {
        page: 'Bio',
        actual: `- ${req.body.username}`,
        info: response
      });
    }
  }
  user(req, res);
});

router.get('/job', (req, res) => {
  res.render('job', {
    page: 'Search an opportunity by id',
    actual: '- job'
  });
});

router.post('/job', (req, res) => {
  async function job (req, res) {
    const response = await fetch(`https://torre.co/api/opportunities/${req.body.id}`)
      .then(res => res.text());
    if (response === 'Opportunity not found') {
      res.render('job', {
        page: 'Search a opportunity by id',
        actual: '- Opportunity',
        status: 'The opportunity was not found'
      });
    } else if (!response) {
      res.render('job', {
        page: 'Opportunity not found',
        actual: '- Opportunity',
        status: 'No response from API'
      });
    } else {
      const convertion = JSON.parse(response);
      console.log(typeof convertion);
      res.render('opportunity', {
        page: 'Opportunity',
        actual: `- ${convertion.objective}`,
        status: 'ok',
        info: convertion
      });
    }
  }
  job(req, res);
});

export default router;
