import {ClassDeclaration, InterfaceDeclaration, Node} from 'ts-morph';

import {findBaseClass} from '../class';
import {findInterface} from '../interface';
import {findMember} from './find-member';
import {getMemberParent} from './get-member-parent';
import {NgDocClassMember, NgDocMemberType} from './member-type';

/**
 *	Returns member that was overridden by the provided one
 *
 * @param member - Target member
 */
export function getOverriddenMember(member: NgDocMemberType): NgDocMemberType | undefined {
	const parent: Node = getMemberParent(member);
	const name: string = member.getName();

	if (Node.isClassDeclaration(parent)) {
		const baseClass: ClassDeclaration | undefined = findBaseClass(parent, (cls: ClassDeclaration) => {
			const member: NgDocClassMember | undefined = findMember(cls, name);
			const isAbstract: boolean = Node.isAbstractable(member) && member.isAbstract();

			return !!member && !isAbstract;
		});

		return baseClass && findMember(baseClass, name);
	}

	if (Node.isInterfaceDeclaration(parent)) {
		const baseInterface: InterfaceDeclaration | undefined = findInterface(
			parent,
			(int: InterfaceDeclaration) => int !== parent && !!findMember(int, name),
		);

		return baseInterface && findMember(baseInterface, name);
	}

	return undefined;
}
