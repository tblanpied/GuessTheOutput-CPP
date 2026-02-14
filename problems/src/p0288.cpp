#include <iostream>

class B { public: virtual ~B() = default; };
class D : public B {};
class E : public B {};

int main() {
    E e;
    B* p = &e;

    D* q = dynamic_cast<D*>(p);

    std::cout << (q == nullptr) << "\n";
}
