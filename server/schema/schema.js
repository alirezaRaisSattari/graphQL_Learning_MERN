const { GraphQLInputObjectType, GraphQLID, GraphQLString, GraphQLObjectType, GraphQLSchema, GraphQLList }= require('graphql')

const Project = require('../models/Project')
const Client = require('../models/Client')
//Client Type
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      phone: { type: GraphQLString },
    }),
  });


  //Client Type
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      description: { type: GraphQLString },
      status: { type: GraphQLString },
      client: { type: ClientType, resolve(parent){
        return Client.findById(parent.clientId)
      }  
    },
    }),
  });

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args) {
                return Client.find();
            },
        },
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Client.findById(args.id);
            },
        },  
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                return Project.find();
            },
        },
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Project.findById(args.id);
            },
        },  
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})