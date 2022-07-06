FROM cypress/included:10.3.0
RUN mkdir /e2e-test
WORKDIR /e2e-test
COPY package.json ./
RUN npm install
COPY . .
VOLUME [ "/e2e-test" ]
RUN npx cypress run