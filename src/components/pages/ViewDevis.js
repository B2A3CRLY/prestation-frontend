import React, { Component} from 'react'
import { apiUrl } from "../../config.json";
import http from '../../services/httpService';
import auth from "../../services/authService";
import logo_final from '../../images/logo_final.png';
import Cachet_Kirikou from '../../images/Cachet_Kirikou.jpg';
const apiDevis = apiUrl + '/devis/';
const apiGoutteAGoutte = apiUrl + '/goutteAgoutte/';
const l = 50
const L = 50
const airesBase = 2500;
const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const now = new Date();
export default class ViewDevis extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            devis: '',
            client: '',
            firstname: '',
            lastname: '',
            phone: '',
            idDevis: '',
            typeTaster: '',
            isWorkForce: '',
            dateCreation: '',
            zoneChamp: '',
            goutteAgouttes: '',
            surfaceCultures: [],
            loginUserByUsername: '',
            coeffSurface: '',
            sex: '',
            I: 1,
            E: 1
        }
    }
    getGoutteAGoutte(I, E, s) {
        let nr = Math.round(s * Math.round(L / I)),
            lTR = Math.round(s * Math.round((L * l) / I)),
            nR400mDN16mm = Math.round(s * Math.round((L * l) / (400 * I))),
            nG_R = Math.round(s * Math.round(l / E)),
            nTG = Math.round(s * Math.round((L * l) / (I * E))),
            nP100PCS = Math.round(s * Math.round((l * L) / (100 * I * E))),
            v3_4M = Math.round(s * Math.round(L / I)),
            te3_4F = Math.round(s * Math.round((L / I))),
            b = Math.round(s * Math.round((L / I))),
            bDN25 = Math.round(s),
            bDN63 = 2,
            dRamp = 16,
            dPRamp = 25,
            workforce = Math.round(s * 100000 * 1.18),
            dNPrincipal = 63,
            teDN63egaux = Math.round(s * 2),
            lPR = Math.round(s * ((L + 5) / 50)),
            lCPDN63_2ha = Math.round(s),
            a63_3 = Math.round(s * 2),
            m25_1 = Math.round(s * 2),
            r2_1_ff = Math.round(s * 2),
            r1_1_MF = Math.round(s * 2),
            cJR25 = Math.round(s * 2),
            vJR25 = Math.round(s * 2),
            cPVCGM = Math.round(s * 2),
            teflon = Math.round(s * 10)
        return {
            nr, lTR, nR400mDN16mm, nG_R, nTG, nP100PCS, v3_4M, te3_4F, b, dRamp, dPRamp, dNPrincipal, teDN63egaux, lPR, lCPDN63_2ha, a63_3, m25_1, r2_1_ff, r1_1_MF, cJR25, vJR25, cPVCGM, bDN63, bDN25, teflon, workforce
        }
    }
    getAspersion(s, p) {
        let pa = 0, nr = 0, lTRDN40mm = 0, nTLCPVC = 0, nA_r, nTA = 0, dNr = 0, dNPr = 0, lPr = 0, lCP75mm = 0, tePDN75mm = 0, rDN75_40 = 0, dN40_1F = 0, vPVC75 = 0, dN40 = 0, bPVCND75 = 0, cPVCD75mm = 0, potCollePVC = 0, teflonA = 0, vPVCDN40 = 0, cPDN40_1 = 0, bPVCND40 = 0, workforce = 0;
        pa = p;
        nr = s * Math.round(L / p);
        lTRDN40mm = s * Math.round((l * L) / (6 * p));
        nTLCPVC = s * Math.round((l * L) / (6 * p));
        nA_r = s * Math.round(l / p);
        nTA = s * Math.round((l * L) / (p * p));
        dNr = 40;
        dNPr = 75;
        lPr = s * (L + 5);
        lCP75mm = 50 * s;
        workforce = s * 100000;
        cPVCD75mm = s * Math.round((L + 5 + 12.5) / 6);
        tePDN75mm = s * Math.round((L / p) + 5);
        rDN75_40 = s * Math.round((L / p) + 5);
        cPDN40_1 = s * Math.round(((l * L) / (p * p)) + 5);
        dN40_1F = s * Math.round((L / p) + 5);
        vPVC75 = s * 2;
        dN40 = s * Math.round((L / p) + 5);
        bPVCND75 = s * 2;
        bPVCND40 = s * Math.round((L / p) + 5);
        potCollePVC = s * 2;
        teflonA = s * 20;
        vPVCDN40 = s * Math.round((L / p) + 5);
        return {
            pa, nr, lTRDN40mm, nTLCPVC, nA_r, nTA, dNr, dNPr, lPr, lCP75mm, tePDN75mm, rDN75_40, dN40_1F, vPVC75, dN40, bPVCND75, cPVCD75mm, potCollePVC, teflonA, vPVCDN40, cPDN40_1, bPVCND40, workforce
        }
    }
    async refreshDevis() {
        const idDevis = this.props.valueFromPrint;
        const { data: devis } = await http.get(apiDevis + 'detail/' + idDevis);
        const { data: goutteAgouttes } = await http.get(apiGoutteAGoutte)
        this.setState({ devis, goutteAgouttes, surfaceCultures: devis.surfaceCultures, client: devis.client, firstname: devis.client.clientFirstName, lastname: devis.client.clientLastName, phone: devis.client.clientPhone, dateCreation: devis.date_creation, zoneChamp: devis.fieldAddress, sex: devis.client.gender, idDevis, typeTaster: devis.typeTaster, isWorkForce: devis.isWorkForce});
    }
    async componentDidMount() {
        this.refreshDevis();
        const user = await auth.getCurrentUser();
        const loginUserByUsername = await auth.getUserObjectByUsername(user ? user : '')
        this.setState({ loginUserByUsername });
    
    }
    render() {
        const { devis, goutteAgouttes, surfaceCultures, client, firstname, lastname, phone, dateCreation, zoneChamp, loginUserByUsername, sex, isWorkForce, typeTaster} = this.state;
        let dateFrench = now.toLocaleDateString('fr-FR', this.optionsDate);
        let nR400mDN16mm = 0, nP100PCS = 0, v3_4M = 0, te3_4F = 0, b = 0, teDN63egaux = 0, lPR = 0, lCPDN63_2ha = 0, a63_3 = 0, m25_1 = 0, r2_1_ff = 0, r1_1_MF = 0, cJR25 = 0, vJR25 = 0, cPVCGM = 0, teflon = 0, bDN63 = 0, bDN25 = 0, workforceGoutte = 0;
        let pa = 0, nr = 0, lTRDN40mm = 0, nTLCPVC = 0, nA_r = 0, nTA = 0, dNpr = 0, lPr = 0, lCP75mm = 0, tePDN75mm = 0, rDN75_40 = 0, dN40_1F = 0, vPVC75 = 0, dN40 = 0, bPVCND75 = 0, potCollePVC = 0, teflonA = 0, vPVCDN40 = 0, cPVCD75mm = 0, cPCDN40_1 = 0, bPVCND40 = 0, workforceAspersion = 0;
        let constGoutteAGoutte = [];
        let constAspersion = [];
        let quotationGoutte = [];
        let quotationGouttePlus = [];
        let quotationAspersion = [];
        let quotationAspersionOnly = [];
        let quotationGoutteView = null;
        let quotationGouttePlusView = null;
        let quotationAspersionView = null;
        let quotationAspersionViewOnly = null;
        let totalPriceGoutte = 0;
        let totalPriceAspersion = 0;
        let totalWorkForce = 0;
        let totalSurface = 0.00;
        let perimetreCloture = 0;
        let perimetreEclairage = 0;
        let totalCloture = 0;
        let totalEclairage = 0;
        let totalSupportMetalique = 0;
        let nEclairage = 0;
        let nCloture = 0;
        console.log('Surface Allouée : ', surfaceCultures);
        console.log('Type de Goutteur : ', typeTaster);
        if (devis) {
            nCloture = (devis.perimetre) / 25;
            nEclairage = (devis.eclairage) / 5;
            totalCloture = nCloture * 40000;
            totalEclairage = nEclairage * 60000;
            totalSupportMetalique = nEclairage * 25000;
            perimetreCloture = devis.perimetre;
            perimetreEclairage = devis.eclairage;

        }
        if (surfaceCultures.length) {
            surfaceCultures.map(surface => {
                totalSurface = parseFloat(totalSurface) + parseFloat(surface.surfaceAllocated)
            })
            console.log('sortir:', totalSurface)
            for (var i = 0; i < surfaceCultures.length; i++) {
                if (surfaceCultures[i].cAssociated && surfaceCultures[i].cAssociated.systemegoutteAgoutte === true) {
                    constGoutteAGoutte[i] = this.getGoutteAGoutte(
                        surfaceCultures[i].cAssociated.ecartement_entre_ligne, surfaceCultures[i].cAssociated.ecartement_sur_ligne, 4 * (surfaceCultures[i].surfaceAllocated))
                }
                else {
                    console.log('error chosen !')
                }
                 
                if (surfaceCultures[i].cAssociated && surfaceCultures[i].cAssociated.systemeAspersion === true) {
                    constAspersion[i] = this.getAspersion(4 * (surfaceCultures[i].surfaceAllocated), (surfaceCultures[i].porteeTheorique * surfaceCultures[i].pourcentage))
                    console.log('EEEEEEEEEE : ', surfaceCultures[i].porteeTheorique * surfaceCultures[i].pourcentage)
                }
                
            }
        }

        if (constGoutteAGoutte.length !== null && constGoutteAGoutte.length !== 0 && constGoutteAGoutte.length) {
            for (var j = 0; j < constGoutteAGoutte.length; j++) {
                nR400mDN16mm += constGoutteAGoutte[j] ? constGoutteAGoutte[j]['nR400mDN16mm'] : 0;
                nP100PCS += constGoutteAGoutte[j] ? constGoutteAGoutte[j]['nP100PCS'] : 0;
                v3_4M += constGoutteAGoutte[j] ? constGoutteAGoutte[j]['v3_4M'] : 0;
                b += constGoutteAGoutte[j] ? constGoutteAGoutte[j]['b'] : 0;
                te3_4F += constGoutteAGoutte[j] ? constGoutteAGoutte[j]['te3_4F'] : 0;
                teDN63egaux += constGoutteAGoutte[j] ? constGoutteAGoutte[j]['teDN63egaux'] : 0;
                a63_3 += constGoutteAGoutte[j] ? constGoutteAGoutte[j]['a63_3'] : 0;
                m25_1 += constGoutteAGoutte[j] ? constGoutteAGoutte[j]['m25_1'] : 0;
                r2_1_ff += constGoutteAGoutte[j] ? constGoutteAGoutte[j]['r2_1_ff'] : 0;
                r1_1_MF += constGoutteAGoutte[j] ? constGoutteAGoutte[j]['r1_1_MF'] : 0;
                cJR25 += constGoutteAGoutte[j] ? constGoutteAGoutte[j]['cJR25'] : 0;
                vJR25 += constGoutteAGoutte[j] ? constGoutteAGoutte[j]['vJR25'] : 0;
                cPVCGM += constGoutteAGoutte[j] ? constGoutteAGoutte[j]['cPVCGM'] : 0;
                teflon += constGoutteAGoutte[j] ? constGoutteAGoutte[j]['teflon'] : 0;
                lPR += constGoutteAGoutte[j] ? constGoutteAGoutte[j]['lPR'] : 0;
                lCPDN63_2ha += constGoutteAGoutte[j] ? constGoutteAGoutte[j]['lCPDN63_2ha'] : 0;
                bDN63 = constGoutteAGoutte[j] ? constGoutteAGoutte[j]['bDN63'] : 0;
                bDN25 += constGoutteAGoutte[j] ? constGoutteAGoutte[j]['bDN25'] : 0;
                workforceGoutte += constGoutteAGoutte[j] ? constGoutteAGoutte[j]['workforce'] : 0;
            }
            if (typeTaster === 'goutteurNonPerfore') {
                quotationGoutte = [
                    { id: 0, ref: "1-a", designation: 'Rouleau de 400 m de tuyau PEHD souple 16 mm', quantity: nR400mDN16mm, price: 60000, totalPrice: Math.round(nR400mDN16mm * 60000) },
                    { id: 1, ref: "1-b", designation: 'Paquets de 100 goutteurs réglables', quantity: 2*nP100PCS, price: 8500, totalPrice: Math.round(2 * nP100PCS * 8500) },
                    { id: 2, ref: "1-c", designation: 'Vannette 3/4, M', quantity: v3_4M, price: 370, totalPrice: Math.round(v3_4M * 370) },
                    { id: 3, ref: "1-d", designation: 'Té Cannelé 3/4, F', quantity: te3_4F, price: 100, totalPrice: Math.round(te3_4F * 100) },
                    { id: 4, ref: "1-e", designation: 'Bouchon Cannelé  Tuyau souple 16 mm', quantity: b, price: 30, totalPrice: Math.round(b * 30) },
                    { id: 5, ref: "1-f", designation: 'Té DN 63 EGO', quantity: teDN63egaux, price: 3550, totalPrice: Math.round(teDN63egaux * 3550) },
                    { id: 6, ref: "1-g", designation: 'Manchon JR 63 mm, Sortie 2" M', quantity: a63_3, price: 3000, totalPrice: Math.round(a63_3 * 3000) },
                    { id: 7, ref: "1-h", designation: 'Manchon JR 25 mm, Sortie 1" M', quantity: m25_1, price: 780, totalPrice: Math.round(m25_1 * 780) },
                    { id: 8, ref: "1-i", designation: 'Réduction 2", 1"/1/2 FF', quantity: r2_1_ff, price: 2000, totalPrice: Math.round(r2_1_ff * 2000) },
                    { id: 9, ref: "1-j", designation: 'Réduction 1" 1/2, 1" MF', quantity: r1_1_MF, price: 1500, totalPrice: Math.round(r1_1_MF * 150) },
                    { id: 10, ref: "1-k", designation: 'Coude JR 25 mm, 1" M', quantity: cJR25, price: 780, totalPrice: Math.round(cJR25 * 780) },
                    { id: 11, ref: "1-l", designation: 'Vanne JR 25 mm', quantity: vJR25, price: 2000, totalPrice: Math.round(vJR25 * 2000) },
                    { id: 12, ref: "1-m", designation: 'Téflon', quantity: teflon, price: 350, totalPrice: Math.round(teflon * 350) },
                    
                ]
                quotationGouttePlus = [
                    { id: 13, ref: "1-n", designation: 'Rouleau Anjou 25 mm, 50 m', quantity: lPR, price: 11000, totalPrice: Math.round(lPR * 11000) },
                    { id: 14, ref: "1-o", designation: 'Rouleau Anjou 63 mm, 50 m', quantity: lCPDN63_2ha, price: 55690, totalPrice: Math.round(lCPDN63_2ha * 55690) },
                    { id: 15, ref: "1-p", designation: 'Bouchon DN 25 mm', quantity: bDN25, price: 600, totalPrice: Math.round(bDN25 * 600) },
                    { id: 16, ref: "1-q", designation: 'Bouchon DN 63 mm', quantity: bDN63, price: 3040, totalPrice: Math.round(bDN63 * 3040) }
                ]
                totalPriceGoutte = Math.round(nR400mDN16mm * 60000 + 2*nP100PCS * 8500 + v3_4M * 370 + te3_4F * 100 + b * 30 + teDN63egaux * 3550 + a63_3 * 3000 + m25_1 * 780 + r2_1_ff * 2000 + r1_1_MF * 1500 + cJR25 * 780 + vJR25 * 2000 + teflon * 350 + lCPDN63_2ha * 55690 + lPR * 11000 + bDN25 * 600 + bDN63 * 3040)
            }
            if (typeTaster === 'goutteurIntegre') {
                quotationGoutte = [
                    { id: 0, ref: "1-a", designation: 'Rouleau de 16m de goutteurs intégrés', quantity: nR400mDN16mm, price: 70000, totalPrice: Math.round(nR400mDN16mm * 70000) },
                    { id: 1, ref: "1-b", designation: 'Vannette 3/4, M', quantity: v3_4M, price: 370, totalPrice: Math.round(v3_4M * 370) },
                    { id: 2, ref: "1-c", designation: 'Té Cannelé 3/4, F', quantity: te3_4F, price: 100, totalPrice: Math.round(te3_4F * 100) },
                    { id: 3, ref: "1-d", designation: 'Bouchon Cannelé  Tuyau souple 16 mm', quantity: b, price: 30, totalPrice: Math.round(b * 30) },
                    { id: 4, ref: "1-e", designation: 'Té DN 63 EGO', quantity: teDN63egaux, price: 3550, totalPrice: Math.round(teDN63egaux * 3550) },
                    { id: 5, ref: "1-f", designation: 'Manchon JR 63 mm, Sortie 2" M', quantity: a63_3, price: 3000, totalPrice: Math.round(a63_3 * 3000) },
                    { id: 6, ref: "1-g", designation: 'Manchon JR 25 mm, Sortie 1" M', quantity: m25_1, price: 780, totalPrice: Math.round(m25_1 * 780) },
                    { id: 7, ref: "1-h", designation: 'Réduction 2", 1"/1/2 FF', quantity: r2_1_ff, price: 2000, totalPrice: Math.round(r2_1_ff * 2000) },
                    { id: 8, ref: "1-i", designation: 'Réduction 1" 1/2, 1" MF', quantity: r1_1_MF, price: 1500, totalPrice: Math.round(r1_1_MF * 150) },
                    { id: 9, ref: "1-j", designation: 'Coude JR 25 mm, 1" M', quantity: cJR25, price: 780, totalPrice: Math.round(cJR25 * 780) },
                    { id: 10, ref: "1-k", designation: 'Vanne JR 25 mm', quantity: vJR25, price: 2000, totalPrice: Math.round(vJR25 * 2000) },
                    { id: 11, ref: "1-l", designation: 'Téflon', quantity: teflon, price: 350, totalPrice: Math.round(teflon * 350) },
                    { id: 12, ref: "1-m", designation: 'Rouleau Anjou 25 mm, 50 m', quantity: lPR, price: 11000, totalPrice: Math.round(lPR * 11000) }
                    
                ]
                quotationGouttePlus = [
                   { id: 13, ref: "1-n", designation: 'Rouleau Anjou 63 mm, 50 m', quantity: lCPDN63_2ha, price: 55690, totalPrice: Math.round(lCPDN63_2ha * 55690) },
                    { id: 14, ref: "1-o", designation: 'Bouchon DN 25 mm', quantity: bDN25, price: 600, totalPrice: Math.round(bDN25 * 600) },
                    { id: 15, ref: "1-p", designation: 'Bouchon DN 63 mm', quantity: bDN63, price: 3040, totalPrice: Math.round(bDN63 * 3040) }
                ]
                totalPriceGoutte = Math.round(nR400mDN16mm * 70000 + v3_4M * 370 + te3_4F * 100 + b * 30 + teDN63egaux * 3550 + a63_3 * 3000 + m25_1 * 780 + r2_1_ff * 2000 + r1_1_MF * 1500 + cJR25 * 780 + vJR25 * 2000 + teflon * 350 + lCPDN63_2ha * 55690 + lPR * 11000 + bDN25 * 600 + bDN63 * 3040)
            }
            if (typeTaster === 'goutteurBasseDensite') {
                quotationGoutte = [
                    { id: 0, ref: "1-a", designation: 'Rouleau de 16m de goutteurs intégrés', quantity: nR400mDN16mm, price: 30000, totalPrice: Math.round(nR400mDN16mm * 30000) },
                    { id: 1, ref: "1-b", designation: 'Vannette 3/4, M', quantity: v3_4M, price: 370, totalPrice: Math.round(v3_4M * 370) },
                    { id: 2, ref: "1-c", designation: 'Té Cannelé 3/4, F', quantity: te3_4F, price: 100, totalPrice: Math.round(te3_4F * 100) },
                    { id: 3, ref: "1-d", designation: 'Bouchon Cannelé  Tuyau souple 16 mm', quantity: b, price: 30, totalPrice: Math.round(b * 30) },
                    { id: 4, ref: "1-e", designation: 'Té DN 63 EGO', quantity: teDN63egaux, price: 3550, totalPrice: Math.round(teDN63egaux * 3550) },
                    { id: 5, ref: "1-f", designation: 'Manchon JR 63 mm, Sortie 2" M', quantity: a63_3, price: 3000, totalPrice: Math.round(a63_3 * 3000) },
                    { id: 6, ref: "1-g", designation: 'Manchon JR 25 mm, Sortie 1" M', quantity: m25_1, price: 780, totalPrice: Math.round(m25_1 * 780) },
                    { id: 7, ref: "1-h", designation: 'Réduction 2", 1"/1/2 FF', quantity: r2_1_ff, price: 2000, totalPrice: Math.round(r2_1_ff * 2000) },
                    { id: 8, ref: "1-i", designation: 'Réduction 1" 1/2, 1" MF', quantity: r1_1_MF, price: 1500, totalPrice: Math.round(r1_1_MF * 150) },
                    { id: 9, ref: "1-j", designation: 'Coude JR 25 mm, 1" M', quantity: cJR25, price: 780, totalPrice: Math.round(cJR25 * 780) },
                    { id: 10, ref: "1-k", designation: 'Vanne JR 25 mm', quantity: vJR25, price: 2000, totalPrice: Math.round(vJR25 * 2000) },
                    { id: 11, ref: "1-l", designation: 'Téflon', quantity: teflon, price: 350, totalPrice: Math.round(teflon * 350) },
                    { id: 12, ref: "1-m", designation: 'Rouleau Anjou 25 mm, 50 m', quantity: lPR, price: 11000, totalPrice: Math.round(lPR * 11000) }
                    
                ]
                quotationGouttePlus = [
                   { id: 13, ref: "1-n", designation: 'Rouleau Anjou 63 mm, 50 m', quantity: lCPDN63_2ha, price: 55690, totalPrice: Math.round(lCPDN63_2ha * 55690) },
                    { id: 14, ref: "1-o", designation: 'Bouchon DN 25 mm', quantity: bDN25, price: 600, totalPrice: Math.round(bDN25 * 600) },
                    { id: 15, ref: "1-p", designation: 'Bouchon DN 63 mm', quantity: bDN63, price: 3040, totalPrice: Math.round(bDN63 * 3040) }
                ]
                totalPriceGoutte = Math.round(nR400mDN16mm * 30000 + v3_4M * 370 + te3_4F * 100 + b * 30 + teDN63egaux * 3550 + a63_3 * 3000 + m25_1 * 780 + r2_1_ff * 2000 + r1_1_MF * 1500 + cJR25 * 780 + vJR25 * 2000 + teflon * 350 + lCPDN63_2ha * 55690 + lPR * 11000 + bDN25 * 600 + bDN63 * 3040)
            }
            
        }
        if (isWorkForce) {
            totalWorkForce = totalSurface * 400000;
        }
        if (constAspersion.length) {
            for (var k = 0; k < constAspersion.length; k++) {
                nTLCPVC += constAspersion[k] ? constAspersion[k]['nTLCPVC'] : '';
                nTA += constAspersion[k] ? constAspersion[k]['nTA'] : '';
                cPVCD75mm += constAspersion[k] ? constAspersion[k]['cPVCD75mm'] : '';
                tePDN75mm += constAspersion[k] ? constAspersion[k]['tePDN75mm'] : '';
                rDN75_40 += constAspersion[k] ? constAspersion[k]['rDN75_40'] : '';
                cPCDN40_1 += constAspersion[k] ? constAspersion[k]['cPDN40_1'] : '';
                vPVC75 += constAspersion[k] ? constAspersion[k]['vPVC75'] : '';
                bPVCND40 += constAspersion[k] ? constAspersion[k]['bPVCND40'] : '';
                bPVCND75 += constAspersion[k] ? constAspersion[k]['bPVCND75'] : '';
                potCollePVC += constAspersion[k] ? constAspersion[k]['potCollePVC'] : '';
                teflonA += constAspersion[k] ? constAspersion[k]['teflonA'] : '';
                vPVCDN40 += constAspersion[k] ? constAspersion[k]['vPVCDN40'] : '';
                workforceAspersion += constAspersion[k] ? constAspersion[k]['workforce'] : '';
                console.log('nTLCPVC : ', nTLCPVC)
            }
            quotationAspersion = [
                { id: 0, ref: "2-a", designation: 'Tuyau PVC DN 40 mm', quantity: nTLCPVC, price: 5500, totalPrice: Math.round(nTLCPVC * 5500) },
                { id: 1, ref: "2-b", designation: 'Asperseur (Portée 13-20 m, débit 45-60,8 L/m, Pression 1,5-3 bar)', quantity: nTA, price: 3250, totalPrice: Math.round(nTA * 3250) },
                { id: 2, ref: "2-c", designation: 'Tuyau PVC DN 75 mm', quantity: cPVCD75mm, price: 9000, totalPrice: Math.round(cPVCD75mm * 9000) },
                { id: 3, ref: "2-d", designation: 'Té Pression DN 75 mm', quantity: tePDN75mm, price: 2000, totalPrice: Math.round(tePDN75mm * 2000) },
                { id: 4, ref: "2-e", designation: 'Réduction DN 75/50 mm', quantity: rDN75_40, price: 700, totalPrice: Math.round(rDN75_40 * 700) },
                { id: 5, ref: "2-f", designation: 'Réduction DN 50/40 mm', quantity: rDN75_40, price: 250, totalPrice: Math.round(rDN75_40 * 250) },
                { id: 6, ref: "2-g", designation: 'Collier de prise en charge DN 40 mm, 1" F', quantity: cPCDN40_1, price: 650, totalPrice: Math.round(cPCDN40_1 * 650) },
                { id: 7, ref: "2-h", designation: 'Vanne PVC DN 75 mm', quantity: vPVC75, price: 13000, totalPrice: Math.round(vPVC75 * 13000) },
                { id: 8, ref: "2-i", designation: 'Bouchon PVC DN 40 mm', quantity: bPVCND40, price: 400, totalPrice: Math.round(bPVCND40 * 400) },
                { id: 9, ref: "2-j", designation: 'Bouchon PVC DN 75 mm', quantity: bPVCND75, price: 1000, totalPrice: Math.round(bPVCND75 * 1000) },
                { id: 10, ref: "2-k", designation: 'Colle PVC GM 1 Kg', quantity: potCollePVC, price: 6000, totalPrice: Math.round(potCollePVC * 6000) },
                { id: 11, ref: "2-l", designation: 'Teflon GM', quantity: teflonA, price: 350, totalPrice: Math.round(teflonA * 350) },
                { id: 12, ref: "2-m", designation: 'Vanne PVC DN 40 mm', quantity: vPVCDN40, price: 3102, totalPrice: Math.round(vPVCDN40 * 3102) }
            ]
            quotationAspersionOnly = [
                { id: 0, ref: "1-a", designation: 'Tuyau PVC DN 40 mm', quantity: nTLCPVC, price: 5500, totalPrice: Math.round(nTLCPVC * 5500) },
                { id: 1, ref: "1-b", designation: 'Asperseur (Portée 13-20 m, débit 45-60,8 L/m, Pression 1,5-3 bar)', quantity: nTA, price: 3250, totalPrice: Math.round(nTA * 3250) },
                { id: 2, ref: "1-c", designation: 'Tuyau PVC DN 75 mm', quantity: cPVCD75mm, price: 9000, totalPrice: Math.round(cPVCD75mm * 9000) },
                { id: 3, ref: "1-d", designation: 'Té Pression DN 75 mm', quantity: tePDN75mm, price: 2000, totalPrice: Math.round(tePDN75mm * 2000) },
                { id: 4, ref: "1-e", designation: 'Réduction DN 75/50 mm', quantity: rDN75_40, price: 700, totalPrice: Math.round(rDN75_40 * 700) },
                { id: 5, ref: "1-f", designation: 'Réduction DN 50/40 mm', quantity: rDN75_40, price: 250, totalPrice: Math.round(rDN75_40 * 250) },
                { id: 6, ref: "1-g", designation: 'Collier de prise en charge DN 40 mm, 1" F', quantity: cPCDN40_1, price: 650, totalPrice: Math.round(cPCDN40_1 * 650) },
                { id: 7, ref: "1-h", designation: 'Vanne PVC DN 75 mm', quantity: vPVC75, price: 13000, totalPrice: Math.round(vPVC75 * 13000) },
                { id: 8, ref: "1-i", designation: 'Bouchon PVC DN 40 mm', quantity: bPVCND40, price: 400, totalPrice: Math.round(bPVCND40 * 400) },
                { id: 9, ref: "1-j", designation: 'Bouchon PVC DN 75 mm', quantity: bPVCND75, price: 1000, totalPrice: Math.round(bPVCND75 * 1000) },
                { id: 10, ref: "1-k", designation: 'Colle PVC GM 1 Kg', quantity: potCollePVC, price: 6000, totalPrice: Math.round(potCollePVC * 6000) },
                { id: 11, ref: "1-l", designation: 'Teflon GM', quantity: teflonA, price: 350, totalPrice: Math.round(teflonA * 350) },
                { id: 12, ref: "1-m", designation: 'Vanne PVC DN 40 mm', quantity: vPVCDN40, price: 3102, totalPrice: Math.round(vPVCDN40 * 3102) }
            ]
        }
        
        totalPriceAspersion = Math.round(1 * (nTLCPVC * 5500 + nTA * 3250 + cPVCD75mm * 9000 + tePDN75mm * 2000 + rDN75_40 * 700 + rDN75_40 * 250 + cPCDN40_1 * 650 + vPVC75 * 13000 + bPVCND40 * 400 + bPVCND75 * 1000 + potCollePVC * 6000 + teflonA * 350 + vPVCDN40 * 3102))
        const style = {
            color: "white",
            margin: "10px"
        };
        
        console.log('devis : ', devis)
        console.log('sexe : ', sex)
        console.log('client : ', client)
        console.log('Prénom : ', firstname)
        console.log('goutteAgoutte : ', goutteAgouttes)
        console.log('surfaceCulture : ', surfaceCultures)
        console.log('constGoutteAGoutte : ', constGoutteAGoutte.length)
        console.log('constAspersion : ', constAspersion.length)
        console.log('teflon : ', teflon)
        console.log('bDN25 : ', bDN25)
        console.log('Surface Total : ', totalSurface)
        console.log('Total Goutte à Goutte : ', totalPriceGoutte)
        console.log('Total Aspersion : ', totalPriceAspersion)
        console.log('Total WorkForce: ', totalWorkForce)
        console.log('Total : ', totalPriceAspersion + totalWorkForce)
        console.log('Total Cloture : ', totalCloture)
        console.log('Total Eclairage : ', totalEclairage)
        console.log('Total Support : ', totalSupportMetalique)
        console.log('username : ', loginUserByUsername[0])
        quotationGoutteView = quotationGoutte.map(dev => {
            return (
                <tr key={dev.id}>
                    <td>{dev.ref}</td>
                    <td>{dev.designation}</td>
                    <td style={{ textAlign: 'right' }}>{dev.quantity}</td>
                    <td style={{ textAlign: 'right' }}>{dev.price}</td>
                    <td style={{ textAlign: 'right' }}>{dev.totalPrice}</td>
                </tr>
            );
        })
        quotationGouttePlusView = quotationGouttePlus.map(dev => {
            return (
                <tr key={dev.id}>
                    <td>{dev.ref}</td>
                    <td>{dev.designation}</td>
                    <td style={{ textAlign: 'right' }}>{dev.quantity}</td>
                    <td style={{ textAlign: 'right' }}>{dev.price}</td>
                    <td style={{ textAlign: 'right' }}>{dev.totalPrice}</td>
                </tr>
            );
        })
        quotationAspersionView = quotationAspersion.map(dev => {
            return (
                <tr key={dev.id}>
                    <td>{dev.ref}</td>
                    <td>{dev.designation}</td>
                    <td >{dev.quantity}</td>
                    <td style={{ textAlign: 'right' }}>{dev.price}</td>
                    <td style={{ textAlign: 'right' }}>{dev.totalPrice}</td>
                </tr>
            );
        })
        quotationAspersionViewOnly = quotationAspersionOnly.map(dev => {
            return (
                <tr key={dev.id}>
                    <td>{dev.ref}</td>
                    <td>{dev.designation}</td>
                    <td >{dev.quantity}</td>
                    <td style={{ textAlign: 'right' }}>{dev.price}</td>
                    <td style={{ textAlign: 'right' }}>{dev.totalPrice}</td>
                </tr>
            );
        })
        
        return (
            <div>
                <div id="pageCounter" className="margin">
                    <p id="image1" className="center">
                        <img src={logo_final} alt="Logo Kirikou" width={5} height={5} />
                    </p>
                    <div className="border-double">
                        <h2 className="border text-center">
                            DEVIS Nº {devis.ref_devis} POUR L'INSTALLATION D'UN SYSTEME {constGoutteAGoutte.length !== 0 && constAspersion.length === 0 ? 'GOUTTE À GOUTTE' : ''} {constGoutteAGoutte.length === 0 && constAspersion.length !== 0 ? 'ASPERSION' : ''} {constGoutteAGoutte.length !== 0 && constAspersion.length !== 0 ? "D'IRRIGATION" : ''} À l'INTENTION DE <span id="orange">{sex === 'Masculin' ? 'M.' + ' ' + firstname.toUpperCase() + ' ' + lastname.toUpperCase() : ''}</span>
                            <span id="orange">{sex === 'Feminin' ? 'Mme.' + ' ' + firstname.toUpperCase() + ' ' + lastname.toUpperCase() : ''}</span>
                        </h2>
                    </div>
                    <div className="space-between-home">
                        <div className="border-client-vert">
                            <p>Prénom (s) du client : <span id="orange">{firstname}</span></p>
                            <p>Nom du client : <span id="orange">{lastname}</span></p>
                            <p>Contacts Téléphoniques : <span id="orange">{phone}</span></p>
                        </div>
                        <div className="border-client-orange">
                            <p>Date de manifestation d'intérêt : <span id="orange">{dateCreation}</span></p>
                            <p>Zone d'éxécution des travaux : <span id="orange">{zoneChamp}</span></p>
                            <p>Superficie du champ agricole : <span id="orange">{totalSurface} {totalCloture > 1 ? "hectares" : "hectare"}</span></p>
                        </div>
                    </div>
                    {constGoutteAGoutte.length !== 0 && constAspersion.length === 0 && typeTaster === 'goutteurNonPerfore' && (
                        <div id="pageNumbers" className="marginTable">
                            <table className=" table table-bordered">
                                <tbody className="thead-dark">
                                    <tr>
                                        <th>Ref</th>
                                        <th style={{ width: '400px' }}>Désignation</th>
                                        <th>Quantité</th>
                                        <th>Prix Unitaire fCFA</th>
                                        <th>Prix Total fCFA</th>
                                    </tr>
                                </tbody>
                                <tbody className="box-text">
                                    <tr>
                                        <th>1</th>
                                        <th colspan="3" style={{ style }}>Les équipements du réseau goutte à goutte</th>
                                        <th></th>
                                    </tr>
                                </tbody>
                                <tbody>
                                    {quotationGoutteView}
                                </tbody>
                            </table>
                            <div className="text-right text-right-one"><h5 id="one">1/2</h5></div>
                            <p style={{ pageBreakAfter: "always" }}></p>
                            <table className=" table table-bordered marginTop">
                                <tbody className="thead-dark">
                                    <tr>
                                        <th>Ref</th>
                                        <th style={{ width: '400px' }}>Désignation</th>
                                        <th>Quantité</th>
                                        <th>Prix Unitaire fCFA</th>
                                        <th>Prix Total fCFA</th>
                                    </tr>
                                </tbody>
                                <tbody>
                                    {quotationGouttePlusView}
                                </tbody>
                                 <tbody>
                                        <tr>
                                            <td>2-a</td>
                                            <td>Panneau solaire de puissance 270 Watts</td>
                                            <td style={{ textAlign: 'right' }}>2</td>
                                            <td style={{ textAlign: 'right' }}>85000</td>
                                            <td style={{ textAlign: 'right' }}>{2*85000}</td>
                                        </tr>
                                    </tbody>
                                <tbody>
                                        <tr>
                                            <td>2-b</td>
                                            <td>Pompe immergée solaire, Débit 3 m3/h, HMT 40 m, Puissance 400 Watts, Tension 24 Volts</td>
                                            <td style={{ textAlign: 'right' }}>1</td>
                                            <td style={{ textAlign: 'right' }}>250000</td>
                                            <td style={{ textAlign: 'right' }}>{250000}</td>
                                        </tr>
                                </tbody>
                                <tbody>
                                        <tr>
                                            <td>2-c</td>
                                            <td>Accessoires solaires</td>
                                            <td style={{ textAlign: 'right' }}>ens</td>
                                            <td style={{ textAlign: 'right' }}>150000</td>
                                            <td style={{ textAlign: 'right' }}>{150000}</td>
                                        </tr>
                                </tbody>
                                 <tbody>
                                        <tr>
                                            <td>2-d</td>
                                            <td>Pompe de surface (electrique) et Accessoires</td>
                                            <td style={{ textAlign: 'right' }}>1</td>
                                            <td style={{ textAlign: 'right' }}>250000</td>
                                            <td style={{ textAlign: 'right' }}>250000</td>
                                        </tr>
                                </tbody> 
                                <tbody>
                                        <tr>
                                            <td>2-e</td>
                                            <td>Frais de déplacement et de séjour</td>
                                            <td style={{ textAlign: 'right' }}>ens</td>
                                            <td style={{ textAlign: 'right' }}>300000</td>
                                            <td style={{ textAlign: 'right' }}>300000</td>
                                        </tr>
                                    </tbody>  
                                {nCloture !== null && nCloture !== 0 && nEclairage === 0 && <>
                                    <tbody className="box-text">
                                        <tr>
                                            <th>2</th>
                                            <th colspan="3" style={{ style }}>Clôture</th>
                                            <th></th>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <td>2-a</td>
                                            <td>Grillage</td>
                                            <td style={{ textAlign: 'right' }}>{nCloture}</td>
                                            <td style={{ textAlign: 'right' }}>40000</td>
                                            <td style={{ textAlign: 'right' }}>{totalCloture}</td>
                                        </tr>
                                    </tbody>
                                </>
                                }
                                {nEclairage !== null && nEclairage !== 0 && nCloture === 0 && <>
                                    <tbody className="box-text">
                                        <tr>
                                            <th>2</th>
                                            <th colspan="3" style={{ style }}>Eclairage</th>
                                            <th></th>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <td>2-a</td>
                                            <td>Lampadaire</td>
                                            <td style={{ textAlign: 'right' }}>{nEclairage}</td>
                                            <td style={{ textAlign: 'right' }}>60000</td>
                                            <td style={{ textAlign: 'right' }}>{totalEclairage}</td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <td>2-b</td>
                                            <td>Support métalique</td>
                                            <td style={{ textAlign: 'right' }}>{nEclairage}</td>
                                            <td style={{ textAlign: 'right' }}>25000</td>
                                            <td style={{ textAlign: 'right' }}>{totalSupportMetalique}</td>
                                        </tr>
                                    </tbody>
                                    
                                </>
                                }
                                {nCloture !== null && nCloture !== 0 && nEclairage !== null && nEclairage !== 0 && <>
                                    <tbody className="box-text">
                                        <tr>
                                            <th>2</th>
                                            <th colspan="3" style={{ style }}>Clôture</th>
                                            <th></th>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <td>2-a</td>
                                            <td>Grillage</td>
                                            <td style={{ textAlign: 'right' }}>{nCloture}</td>
                                            <td style={{ textAlign: 'right' }}>40000</td>
                                            <td style={{ textAlign: 'right' }}>{totalCloture}</td>
                                        </tr>
                                    </tbody>
                                    <tbody className="box-text">
                                        <tr>
                                            <th>3</th>
                                            <th colspan="3" style={{ style }}>Eclairage</th>
                                            <th></th>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <td>3-a</td>
                                            <td>Lampadaire</td>
                                            <td style={{ textAlign: 'right' }}>{nEclairage}</td>
                                            <td style={{ textAlign: 'right' }}>60000</td>
                                            <td style={{ textAlign: 'right' }}>{totalEclairage}</td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <td>3-b</td>
                                            <td>Support métalique</td>
                                            <td style={{ textAlign: 'right' }}>{nEclairage}</td>
                                            <td style={{ textAlign: 'right' }}>25000</td>
                                            <td style={{ textAlign: 'right' }}>{totalSupportMetalique}</td>
                                        </tr>
                                    </tbody>
                                    
                                </>
                                }
                                <tbody>
                                    <tr>
                                        <th>1-s</th>
                                        <th>Main d'oeuvre pour l'installation technique détaillée comprenant toute l'ingénieurie hydraulique et électrique</th>
                                        <th style={{ textAlign: 'right' }}>{totalWorkForce !==0 ? 1:'X'}</th>
                                        <th colspan="1" style={{ textAlign: 'right' }}>{totalWorkForce !==0 ? totalWorkForce:'X'}</th>
                                        <th style={{ textAlign: 'right' }}>{totalWorkForce !==0 ? totalWorkForce:'X'}</th>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th style={{ textAlign: 'center' }}>Total (TTC)</th>
                                        <th colspan="1" style={{ textAlign: 'right' }}>{1.18*(totalPriceGoutte + totalWorkForce + totalCloture + totalEclairage + totalSupportMetalique + 570000 + 550000)}</th>
                                        <th style={{ textAlign: 'right' }}>{1.18*(totalPriceGoutte + totalWorkForce + totalCloture + totalEclairage + totalSupportMetalique + 570000 + 550000)}</th>
                                    </tr>
                                </tbody>
                            </table>
                            {nCloture === 0 && nEclairage === 0 && <div className="text-right-two"><h5 id="two">2/2</h5></div>}
                            {nCloture !== 0 && nEclairage === 0 && <div className="text-right-two-cloture"><h5 id="two">2/2</h5></div>}
                            {nCloture === 0 && nEclairage !== 0 && <div className="text-right-two-eclairage"><h5 id="two">2/2</h5></div>}
                            {nCloture !== 0 && nEclairage !== 0 && <div className="text-right-two-cloture-eclairage"><h5 id="two">2/2</h5></div>}
                        </div>
                    )
                    }
                    {constGoutteAGoutte.length !== 0 && constAspersion.length === 0 && (typeTaster === 'goutteurIntegre'|| typeTaster === 'goutteurBasseDensite') && (
                        <div id="pageNumbers" className="marginTable">
                            <table className=" table table-bordered">
                                <tbody className="thead-dark">
                                    <tr>
                                        <th>Ref</th>
                                        <th style={{ width: '400px' }}>Désignation</th>
                                        <th>Quantité</th>
                                        <th>Prix Unitaire fCFA</th>
                                        <th>Prix Total fCFA</th>
                                    </tr>
                                </tbody>
                                <tbody className="box-text">
                                    <tr>
                                        <th>1</th>
                                        <th colspan="3" style={{ style }}>Les équipements du réseau goutte à goutte</th>
                                        <th></th>
                                    </tr>
                                </tbody>
                                <tbody>
                                    {quotationGoutteView}
                                </tbody>
                            </table>
                            <div className="text-right text-right-one-integre"><h5 id="one">1/2</h5></div>
                            <p style={{ pageBreakAfter: "always" }}></p>
                            <table className=" table table-bordered marginTop">
                                <tbody className="thead-dark">
                                    <tr>
                                        <th>Ref</th>
                                        <th style={{ width: '400px' }}>Désignation</th>
                                        <th>Quantité</th>
                                        <th>Prix Unitaire fCFA</th>
                                        <th>Prix Total fCFA</th>
                                    </tr>
                                </tbody>
                                <tbody>
                                    {quotationGouttePlusView}
                                </tbody>
                                {nCloture !== null && nCloture !== 0 && nEclairage === 0 && <>
                                    <tbody className="box-text">
                                        <tr>
                                            <th>2</th>
                                            <th colspan="3" style={{ style }}>Clôture</th>
                                            <th></th>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <td>2-a</td>
                                            <td>Grillage</td>
                                            <td style={{ textAlign: 'right' }}>{nCloture}</td>
                                            <td style={{ textAlign: 'right' }}>40000</td>
                                            <td style={{ textAlign: 'right' }}>{totalCloture}</td>
                                        </tr>
                                    </tbody>
                                </>
                                }
                                {nEclairage !== null && nEclairage !== 0 && nCloture === 0 && <>
                                    <tbody className="box-text">
                                        <tr>
                                            <th>2</th>
                                            <th colspan="3" style={{ style }}>Eclairage</th>
                                            <th></th>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <td>2-a</td>
                                            <td>Lampadaire</td>
                                            <td style={{ textAlign: 'right' }}>{nEclairage}</td>
                                            <td style={{ textAlign: 'right' }}>60000</td>
                                            <td style={{ textAlign: 'right' }}>{totalEclairage}</td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <td>2-b</td>
                                            <td>Support métalique</td>
                                            <td style={{ textAlign: 'right' }}>{nEclairage}</td>
                                            <td style={{ textAlign: 'right' }}>25000</td>
                                            <td style={{ textAlign: 'right' }}>{totalSupportMetalique}</td>
                                        </tr>
                                    </tbody>
                                </>
                                }
                                {nCloture !== null && nCloture !== 0 && nEclairage !== null && nEclairage !== 0 && <>
                                    <tbody className="box-text">
                                        <tr>
                                            <th>2</th>
                                            <th colspan="3" style={{ style }}>Clôture</th>
                                            <th></th>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <td>2-a</td>
                                            <td>Grillage</td>
                                            <td style={{ textAlign: 'right' }}>{nCloture}</td>
                                            <td style={{ textAlign: 'right' }}>40000</td>
                                            <td style={{ textAlign: 'right' }}>{totalCloture}</td>
                                        </tr>
                                    </tbody>
                                    <tbody className="box-text">
                                        <tr>
                                            <th>3</th>
                                            <th colspan="3" style={{ style }}>Eclairage</th>
                                            <th></th>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <td>3-a</td>
                                            <td>Lampadaire</td>
                                            <td style={{ textAlign: 'right' }}>{nEclairage}</td>
                                            <td style={{ textAlign: 'right' }}>60000</td>
                                            <td style={{ textAlign: 'right' }}>{totalEclairage}</td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <td>3-b</td>
                                            <td>Support métalique</td>
                                            <td style={{ textAlign: 'right' }}>{nEclairage}</td>
                                            <td style={{ textAlign: 'right' }}>25000</td>
                                            <td style={{ textAlign: 'right' }}>{totalSupportMetalique}</td>
                                        </tr>
                                    </tbody>
                                </>
                                }
                                <tbody>
                                    <tr>
                                        <th>1-s</th>
                                        <th>Main d'oeuvre pour l'installation technique détaillée comprenant toute l'ingénieurie hydraulique et électrique</th>
                                        <th style={{ textAlign: 'right' }}>{totalWorkForce !==0 ? 1:'X'}</th>
                                        <th colspan="1" style={{ textAlign: 'right' }}>{totalWorkForce !==0 ? totalWorkForce:'X'}</th>
                                        <th style={{ textAlign: 'right' }}>{totalWorkForce !==0 ? totalWorkForce:'X'}</th>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th style={{ textAlign: 'center' }}>Total (TTC)</th>
                                        <th colspan="1" style={{ textAlign: 'right' }}>{1.18*(totalPriceGoutte + totalWorkForce + totalCloture + totalEclairage + totalSupportMetalique)}</th>
                                        <th style={{ textAlign: 'right' }}>{1.18*(totalPriceGoutte + totalWorkForce + totalCloture + totalEclairage + totalSupportMetalique)}</th>
                                    </tr>
                                </tbody>
                            </table>
                            {nCloture === 0 && nEclairage === 0 && <div className="text-integre"><h5 id="two">2/2</h5></div>}
                            {nCloture !== 0 && nEclairage === 0 && <div className="text-right-two-cloture-integre"><h5 id="two">2/2</h5></div>}
                            {nCloture === 0 && nEclairage !== 0 && <div className="text-right-two-eclairage-integre"><h5 id="two">2/2</h5></div>}
                            {nCloture !== 0 && nEclairage !== 0 && <div className="text-right-two-cloture-eclairage-integre"><h5 id="two">2/2</h5></div>}
                        </div>
                    )
                    }
                    {constAspersion.length !== 0 && constGoutteAGoutte.length === 0 && (
                        <div id="pageNumbers" className="marginTable">
                            <table className=" table table-bordered">
                                <tbody className="thead-dark">
                                    <tr>
                                        <th>Ref</th>
                                        <th style={{ width: '400px' }}>Désignation</th>
                                        <th>Quantité</th>
                                        <th>Prix Unitaire fCFA</th>
                                        <th>Prix Total fCFA</th>
                                    </tr>
                                </tbody>
                                <tbody className="box-text">
                                    <tr>
                                        <th>1</th>
                                        <th colspan="3" style={{ style }}>Les équipements du réseau aspersion</th>
                                        <th></th>
                                    </tr>
                                </tbody>
                                <tbody>
                                    {quotationAspersionViewOnly}
                                </tbody>
                            </table>
                            <div className="text-right-a text-right-one"><h5 id="one">1/2</h5></div>
                            <p style={{ pageBreakAfter: "always" }}></p>
                            <table className=" table table-bordered marginTop">
                                <tbody className="thead-dark">
                                    <tr>
                                        <th>Ref</th>
                                        <th style={{ width: '400px' }}>Désignation</th>
                                        <th>Quantité</th>
                                        <th>Prix Unitaire fCFA</th>
                                        <th>Prix Total fCFA</th>
                                    </tr>
                                </tbody>
                                {nCloture !== null && nCloture !== 0 && nEclairage === 0 && <>
                                    <tbody className="box-text">
                                        <tr>
                                            <th>2</th>
                                            <th colspan="3" style={{ style }}>Clôture</th>
                                            <th></th>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <td>2-a</td>
                                            <td>Grillage</td>
                                            <td style={{ textAlign: 'right' }}>{nCloture}</td>
                                            <td style={{ textAlign: 'right' }}>40000</td>
                                            <td style={{ textAlign: 'right' }}>{totalCloture}</td>
                                        </tr>
                                    </tbody>
                                </>
                                }
                                {nEclairage !== null && nEclairage !== 0 && nCloture === 0 && <>
                                    <tbody className="box-text">
                                        <tr>
                                            <th>2</th>
                                            <th colspan="3" style={{ style }}>Eclairage</th>
                                            <th></th>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <td>2-a</td>
                                            <td>Lampadaire</td>
                                            <td style={{ textAlign: 'right' }}>{nEclairage}</td>
                                            <td style={{ textAlign: 'right' }}>60000</td>
                                            <td style={{ textAlign: 'right' }}>{totalEclairage}</td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <td>2-b</td>
                                            <td>Support métalique</td>
                                            <td style={{ textAlign: 'right' }}>{nEclairage}</td>
                                            <td style={{ textAlign: 'right' }}>25000</td>
                                            <td style={{ textAlign: 'right' }}>{totalSupportMetalique}</td>
                                        </tr>
                                    </tbody>
                                </>
                                }
                                {nCloture !== null && nCloture !== 0 && nEclairage !== null && nEclairage !== 0 && <>
                                    <tbody className="box-text">
                                        <tr>
                                            <th>2</th>
                                            <th colspan="3" style={{ style }}>Clôture</th>
                                            <th></th>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <td>2-a</td>
                                            <td>Grillage</td>
                                            <td style={{ textAlign: 'right' }}>{nCloture}</td>
                                            <td style={{ textAlign: 'right' }}>40000</td>
                                            <td style={{ textAlign: 'right' }}>{totalCloture}</td>
                                        </tr>
                                    </tbody>
                                    <tbody className="box-text">
                                        <tr>
                                            <th>3</th>
                                            <th colspan="3" style={{ style }}>Eclairage</th>
                                            <th></th>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <td>3-a</td>
                                            <td>Lampadaire</td>
                                            <td style={{ textAlign: 'right' }}>{nEclairage}</td>
                                            <td style={{ textAlign: 'right' }}>60000</td>
                                            <td style={{ textAlign: 'right' }}>{totalEclairage}</td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <td>3-b</td>
                                            <td>Support métalique</td>
                                            <td style={{ textAlign: 'right' }}>{nEclairage}</td>
                                            <td style={{ textAlign: 'right' }}>25000</td>
                                            <td style={{ textAlign: 'right' }}>{totalSupportMetalique}</td>
                                        </tr>
                                    </tbody>
                                </>
                                }
                                <tbody>
                                    <tr>
                                        <th>1-t</th>
                                        <th>Main d'oeuvre pour l'installation technique détaillée comprenant toute l'ingénieurie hydraulique et électrique</th>
                                        <th style={{ textAlign: 'right' }}>1</th>
                                        <th colspan="1" style={{ textAlign: 'right' }}>{totalWorkForce !==0 ? totalWorkForce:'X'}</th>
                                        <th style={{ textAlign: 'right' }}>{totalWorkForce !==0 ? totalWorkForce:'X'}</th>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th style={{ textAlign: 'right' }}>Total (TTC)</th>
                                        <th colspan="1" style={{ textAlign: 'right' }}>{totalWorkForce + totalPriceAspersion + totalCloture + totalEclairage + totalSupportMetalique}</th>
                                        <th style={{ textAlign: 'right' }}>{totalWorkForce + totalPriceAspersion + totalCloture + totalEclairage + totalSupportMetalique}</th>
                                    </tr>
                                </tbody>
                            </table>
                            {nCloture === 0 && nEclairage === 0 && <div className="text-right-two-aspersion"><h5 id="two">2/2</h5></div>}
                            {nCloture !== 0 && nEclairage === 0 && <div className="text-right-two-aspersion-cloture"><h5 id="two">2/2</h5></div>}
                            {nCloture === 0 && nEclairage !== 0 && <div className="text-right-two-aspersion-eclairage"><h5 id="two">2/2</h5></div>}
                            {nCloture !== 0 && nEclairage !== 0 && <div className="text-right-two-aspersion-cloture-eclairage"><h5 id="two">2/2</h5></div>}
                        </div>
                    )
                    }
                    {constGoutteAGoutte.length !== 0 && constAspersion.length !== 0 && (
                        <div id="pageNumbers" className="marginTable">
                            <table className=" table table-bordered">
                                <tbody className="thead-dark">
                                    <tr>
                                        <th>Ref</th>
                                        <th style={{ width: '400px' }}>Désignation</th>
                                        <th>Quantité</th>
                                        <th>Prix Unitaire fCFA</th>
                                        <th>Prix Total fCFA</th>
                                    </tr>
                                </tbody>
                                <tbody className="box-text">
                                    <tr>
                                        <th>1</th>
                                        <th colspan="3" style={{ style }}>Les équipements du réseau goutte à goutte</th>
                                        <th></th>
                                    </tr>
                                </tbody>
                                <tbody>
                                    {quotationGoutteView}
                                </tbody>
                            </table>
                            <div className="text-right text-right-one"><h5 id="one">1/3</h5></div>
                            <p style={{ pageBreakAfter: "always" }}></p>
                            <table className=" table table-bordered marginTop">
                                <tbody className="thead-dark">
                                    <tr>
                                        <th>Ref</th>
                                        <th style={{ width: '400px' }}>Désignation</th>
                                        <th>Quantité</th>
                                        <th>Prix Unitaire fCFA</th>
                                        <th>Prix Total fCFA</th>
                                    </tr>
                                </tbody>
                                <tbody>
                                    {quotationGouttePlusView}
                                </tbody>
                                <tbody className="box-text">
                                    <tr>
                                        <th>2</th>
                                        <th colspan="3" style={{ style }}>Les équipements du réseau aspersion</th>
                                        <th></th>
                                    </tr>
                                </tbody>
                                <tbody>
                                    {quotationAspersionView}
                                </tbody>
                            </table>
                            <div className="text-right-two-end"><h5 id="two">2/3</h5></div>
                            <p style={{ pageBreakAfter: "always" }}></p>
                            <table className=" table table-bordered marginTop">
                                <tbody className="thead-dark">
                                    <tr>
                                        <th>Ref</th>
                                        <th style={{ width: '400px' }}>Désignation</th>
                                        <th>Quantité</th>
                                        <th>Prix Unitaire fCFA</th>
                                        <th>Prix Total fCFA</th>
                                    </tr>
                                </tbody>
                                {nCloture !== null && nCloture !== 0 && nEclairage === 0 && <>
                                    <tbody className="box-text">
                                        <tr>
                                            <th>3</th>
                                            <th colspan="3" style={{ style }}>Clôture</th>
                                            <th></th>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <td>3-a</td>
                                            <td>Grillage</td>
                                            <td style={{ textAlign: 'right' }}>{nCloture}</td>
                                            <td style={{ textAlign: 'right' }}>40000</td>
                                            <td style={{ textAlign: 'right' }}>{totalCloture}</td>
                                        </tr>
                                    </tbody>
                                </>
                                }
                                {nEclairage !== null && nEclairage !== 0 && nCloture === 0 && <>
                                    <tbody className="box-text">
                                        <tr>
                                            <th>3</th>
                                            <th colspan="3" style={{ style }}>Eclairage</th>
                                            <th></th>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <td>3-a</td>
                                            <td>Lampadaire</td>
                                            <td style={{ textAlign: 'right' }}>{nEclairage}</td>
                                            <td style={{ textAlign: 'right' }}>60000</td>
                                            <td style={{ textAlign: 'right' }}>{totalEclairage}</td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <td>3-b</td>
                                            <td>Support métalique</td>
                                            <td style={{ textAlign: 'right' }}>{nEclairage}</td>
                                            <td style={{ textAlign: 'right' }}>25000</td>
                                            <td style={{ textAlign: 'right' }}>{totalSupportMetalique}</td>
                                        </tr>
                                    </tbody>
                                </>
                                }
                                {nCloture !== null && nCloture !== 0 && nEclairage !== null && nEclairage !== 0 && <>
                                    <tbody className="box-text">
                                        <tr>
                                            <th>3</th>
                                            <th colspan="3" style={{ style }}>Clôture</th>
                                            <th></th>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <td>3-a</td>
                                            <td>Grillage</td>
                                            <td style={{ textAlign: 'right' }}>{nCloture}</td>
                                            <td style={{ textAlign: 'right' }}>40000</td>
                                            <td style={{ textAlign: 'right' }}>{totalCloture}</td>
                                        </tr>
                                    </tbody>
                                    <tbody className="box-text">
                                        <tr>
                                            <th>4</th>
                                            <th colspan="3" style={{ style }}>Eclairage</th>
                                            <th></th>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <td>4-a</td>
                                            <td>Lampadaire</td>
                                            <td style={{ textAlign: 'right' }}>{nEclairage}</td>
                                            <td style={{ textAlign: 'right' }}>60000</td>
                                            <td style={{ textAlign: 'right' }}>{totalEclairage}</td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <td>4-b</td>
                                            <td>Support métalique</td>
                                            <td style={{ textAlign: 'right' }}>{nEclairage}</td>
                                            <td style={{ textAlign: 'right' }}>25000</td>
                                            <td style={{ textAlign: 'right' }}>{totalSupportMetalique}</td>
                                        </tr>
                                    </tbody>
                                </>
                                }
                                <tbody>
                                    <tr>
                                        <th></th>
                                        <th>Main d'oeuvre pour l'installation technique détaillée comprenant toute l'ingénieurie hydraulique et électrique</th>
                                        <th style={{ textAlign: 'right' }}>1</th>
                                        <th colspan="1" style={{ textAlign: 'right' }}>{totalWorkForce !==0 ? totalWorkForce:'X'}</th>
                                        <th style={{ textAlign: 'right' }}>{totalWorkForce !==0 ? totalWorkForce:'X'}</th>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th style={{ textAlign: 'center' }}>Total (TTC)</th>
                                        <th colspan="1" style={{ textAlign: 'right' }}>{1.18*(totalPriceGoutte + totalWorkForce + totalPriceAspersion + totalCloture + totalEclairage + totalSupportMetalique)}</th>
                                        <th style={{ textAlign: 'right' }}>{1.18*(totalPriceGoutte + totalWorkForce + totalPriceAspersion + totalCloture + totalEclairage + totalSupportMetalique)}</th>
                                    </tr>
                                </tbody>
                            </table>
                            {nCloture === 0 && nEclairage === 0 && <div className="text-right-three"><h5 id="two">3/3</h5></div>}
                            {nCloture !== 0 && nEclairage === 0 && <div className="text-right-three-cloture"><h5 id="two">3/3</h5></div>}
                            {nCloture === 0 && nEclairage !== 0 && <div className="text-right-three-eclairage"><h5 id="two">3/3</h5></div>}
                            {nCloture !== 0 && nEclairage !== 0 && <div className="text-right-three-cloture-eclairage"><h5 id="two">3/3</h5></div>}
                        </div>
                    )
                    }
                </div>
                {constGoutteAGoutte.length !== 0 && constAspersion.length === 0 && nCloture === 0 && nEclairage === 0 && (
                    <div className="space-between-end">
                        <div>
                            <p>Fait à Dakar (Sénégal), le {dateFrench}</p>
                        </div>
                        <div>
                            <div className="space-right"><strong>LE SERVICE COMMERCIAL:</strong><br /></div>
                            <h4 className="space-left">
                                {loginUserByUsername[0] ? loginUserByUsername[0].first_name : ''} {' '} {loginUserByUsername[0] ? loginUserByUsername[0].last_name : ''}
                            </h4>
                        </div>
                    </div>
                )}
                {constGoutteAGoutte.length !== 0 && constAspersion.length === 0 && nCloture !== 0 && nEclairage === 0 && (
                    <div className="space-between-cloture">
                        <div>
                            <p>Fait à Dakar (Sénégal), le {dateFrench}</p>
                        </div>
                        <div>
                            <div className="space-right"><strong>LE SERVICE COMMERCIAL:</strong><br /></div>
                            <div className="space-left">
                                {loginUserByUsername[0] ? loginUserByUsername[0].first_name : ''} {' '} {loginUserByUsername[0] ? loginUserByUsername[0].last_name : ''}
                            </div>
                        </div>
                    </div>
                )}
                {constGoutteAGoutte.length !== 0 && constAspersion.length === 0 && nCloture === 0 && nEclairage !== 0 && (
                    <div className="space-between-eclairage">
                        <div>
                            <p>Fait à Dakar (Sénégal), le {dateFrench}</p>
                        </div>
                        <div>
                            <div className="space-right"><strong>LE SERVICE COMMERCIAL:</strong><br /></div>
                            <div className="space-left">
                                {loginUserByUsername[0] ? loginUserByUsername[0].first_name : ''} {' '} {loginUserByUsername[0] ? loginUserByUsername[0].last_name : ''}
                            </div>
                        </div>
                    </div>
                )}
                {constGoutteAGoutte.length !== 0 && constAspersion.length === 0 && nCloture !== 0 && nEclairage !== 0 && (
                    <div className="space-between-cloture-eclairage">
                        <div>
                            <p>Fait à Dakar (Sénégal), le {dateFrench}</p>
                        </div>
                        <div>
                            <div className="space-right"><strong>LE SERVICE COMMERCIAL:</strong><br /></div>
                            <div className="space-left">
                                {loginUserByUsername[0] ? loginUserByUsername[0].first_name : ''} {' '} {loginUserByUsername[0] ? loginUserByUsername[0].last_name : ''}
                            </div>
                        </div>
                    </div>
                )}
                {constGoutteAGoutte.length === 0 && constAspersion.length !== 0 && nCloture === 0 && nEclairage === 0 && (
                    <div className="space-between-end">
                        <div>
                            <p>Fait à Dakar (Sénégal), le {dateFrench}</p>
                        </div>
                        <div>
                            <div className="space-right"><strong>LE SERVICE COMMERCIAL:</strong><br /></div>
                            <div className="space-left">
                                {loginUserByUsername[0] ? loginUserByUsername[0].first_name : ''} {' '} {loginUserByUsername[0] ? loginUserByUsername[0].last_name : ''}
                            </div>
                        </div>
                    </div>
                )}
                {constGoutteAGoutte.length === 0 && constAspersion.length !== 0 && nCloture !== 0 && nEclairage === 0 && (
                    <div className="space-between-aspersion-cloture">
                        <div>
                            <p>Fait à Dakar (Sénégal), le {dateFrench}</p>
                        </div>
                        <div>
                            <div className="space-right"><strong>LE SERVICE COMMERCIAL:</strong><br /></div>
                            <div className="space-left">
                                {loginUserByUsername[0] ? loginUserByUsername[0].first_name : ''} {' '} {loginUserByUsername[0] ? loginUserByUsername[0].last_name : ''}
                            </div>
                        </div>
                    </div>
                )}
                {constGoutteAGoutte.length === 0 && constAspersion.length !== 0 && nCloture === 0 && nEclairage !== 0 && (
                    <div className="space-between-aspersion-eclairage">
                        <div>
                            <p>Fait à Dakar (Sénégal), le {dateFrench}</p>
                        </div>
                        <div>
                            <div className="space-right"><strong>LE SERVICE COMMERCIAL:</strong><br /></div>
                            <div className="space-left">
                                {loginUserByUsername[0] ? loginUserByUsername[0].first_name : ''} {' '} {loginUserByUsername[0] ? loginUserByUsername[0].last_name : ''}
                            </div>
                        </div>
                    </div>
                )}
                {constGoutteAGoutte.length === 0 && constAspersion.length !== 0 && nCloture !== 0 && nEclairage !== 0 && (
                    <div className="space-between-aspersion-cloture-eclairage">
                        <div>
                            <p>Fait à Dakar (Sénégal), le {dateFrench}</p>
                        </div>
                        <div>
                            <div className="space-right"><strong>LE SERVICE COMMERCIAL:</strong><br /></div>
                            <div className="space-left">
                                {loginUserByUsername[0] ? loginUserByUsername[0].first_name : ''} {' '} {loginUserByUsername[0] ? loginUserByUsername[0].last_name : ''}
                            </div>
                        </div>
                    </div>
                )}
                {constGoutteAGoutte.length !== 0 && constAspersion.length !== 0 && nCloture === 0 && nEclairage === 0 && (
                    <div className="space-between-both">
                        <div>
                            <p>Fait à Dakar (Sénégal), le {dateFrench}</p>
                        </div>
                        <div>
                            <div className="space-right"><strong>LE SERVICE COMMERCIAL:</strong><br /></div>
                            <div className="space-left">
                                {loginUserByUsername[0] ? loginUserByUsername[0].first_name : ''} {' '} {loginUserByUsername[0] ? loginUserByUsername[0].last_name : ''}
                            </div>
                        </div>
                    </div>
                )}
                {constGoutteAGoutte.length !== 0 && constAspersion.length !== 0 && nCloture !== 0 && nEclairage === 0 && (
                    <div className="space-between-both-cloture">
                        <div>
                            <p>Fait à Dakar (Sénégal), le {dateFrench}</p>
                        </div>
                        <div>
                            <div className="space-right"><strong>LE SERVICE COMMERCIAL:</strong><br /></div>
                            <div className="space-left">
                                {loginUserByUsername[0] ? loginUserByUsername[0].first_name : ''} {' '} {loginUserByUsername[0] ? loginUserByUsername[0].last_name : ''}
                            </div>
                        </div>
                    </div>
                )}
                {constGoutteAGoutte.length !== 0 && constAspersion.length !== 0 && nCloture === 0 && nEclairage !== 0 && (
                    <div className="space-between-both-eclairage">
                        <div>
                            <p>Fait à Dakar (Sénégal), le {dateFrench}</p>
                        </div>
                        <div>
                            <div className="space-right"><strong>LE SERVICE COMMERCIAL:</strong><br /></div>
                            <div className="space-left">
                                {loginUserByUsername[0] ? loginUserByUsername[0].first_name : ''} {' '} {loginUserByUsername[0] ? loginUserByUsername[0].last_name : ''}
                            </div>
                        </div>
                    </div>
                )}
                {constGoutteAGoutte.length !== 0 && constAspersion.length !== 0 && nCloture !== 0 && nEclairage !== 0 && (
                    <div className="space-between-both-cloture-eclairage">
                        <div>
                            <p>Fait à Dakar (Sénégal), le {dateFrench}</p>
                        </div>
                        <div>
                            <div className="space-right"><strong>LE SERVICE COMMERCIAL:</strong><br /></div>
                            <div className="space-left">
                                {loginUserByUsername[0] ? loginUserByUsername[0].first_name : ''} {' '} {loginUserByUsername[0] ? loginUserByUsername[0].last_name : ''}
                            </div>
                        </div>
                    </div>
                )}
                <div id="image2" className="text-right"><img src={Cachet_Kirikou}
                    alt="Cachet Kirikou" />
                </div>
                <div className="font-smaller footer">
                    <p>
                        KIRIKOU Sarl<br />RC: SN.DKR.2018.B.20233/NINEA: 0069399642Y2<br />Siège social : DAKAR(Sénégal), Yoff Cité BIAGUI, rue YF-496<br />
                        Site internet: <span className="text-primary">www.kirikousystems.com</span> | Email :<span className="text-primary">contact@kirikousystems.com </span><br />Service client : +221 78 601 88 88 | +221 33 860 30 73 | +221 77 277 00 56
                    </p>
                    <div>
                    </div>
                </div>
            </div>
        )
    }
}

