require('./config');
var should = require('should');
var assert = require('assert');
var fsAPI = require('../src/index');

var fsa = new fsAPI(fsaConf.ACCESS_TOKEN);

describe('fsapi', function(){
	describe('#submitForm()', function(){
		
		it('should throw an error if formId is not number', function(){
			(function(){
				fsa.submitForm('FAIL');
			}).should.throw();
		})
		
		it('should throw an error if args.fieldIds.length != args.fieldValues.length', function(){
			(function(){
				fsa.submitForm(fsaConf.FORM_SUBMIT_ID, {
					fieldIds: [1, 2],
					fieldValues: ['A']
				});
			}).should.throw();
		})
		
		it('should throw an error if args.timestamp is invalid', function(){
			(function(){
				fsa.submitForm(fsaConf.FORM_SUBMIT_ID, {timestamp: 'fail'});
			}).should.throw();
		})
		
		it('should throw an error if a args.fieldIds value is not a number', function(){
			(function(){
				fsa.submitForm(fsaConf.FORM_SUBMIT_ID, {
					fieldIds: [1, 'FAIL'],
					fieldValues: ['A', 'B']
				});
			}).should.throw();
		})
		
		it('should submit form succesfuly', function(done){
			fsa.submitForm(fsaConf.FORM_SUBMIT_ID, {
				fieldIds: fsaConf.submitFormFieldIds,
				fieldValues: fsaConf.submitFormFieldValues
			}, function(data, err){
				should.exist(data);
				(Number(data.id)).should.be.a.Number;
				done();
			});
		})
	})
})