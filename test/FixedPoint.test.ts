import { deployContract } from 'ethereum-waffle';
import { waffle } from "@nomiclabs/buidler";
import ExposedFixedPoint from "../build/ExposedFixedPoint.json";
import { expect } from 'chai'
import { ethers, Contract } from 'ethers'

const provider = waffle.provider;
const [wallet] = provider.getWallets();

const toWei = ethers.utils.parseEther

describe('FixedPoint', () => {

  let fixedPoint: Contract

  beforeEach(async () =>{ 
    fixedPoint = await deployContract(wallet, ExposedFixedPoint)
  })

  describe('calculateMantissa()', () => {
    it('calculate the mantissa correctly', async () => {
      expect(await fixedPoint.calculateMantissa('1', '100')).to.equal(toWei('0.01'))
    })
  })

  describe('divideUintByMantissa', () => {
    it('should work', async () => {
      expect((await fixedPoint.divideUintByMantissa('100', toWei('0.1'))).toString()).to.equal('1000')
    })
  })

  describe('multiplyUintByMantissa', () => {
    it('should work', async () => {
      expect((await fixedPoint.multiplyUintByMantissa('100', toWei('0.1'))).toString()).to.equal('10')
    })
  })
})
