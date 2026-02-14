#include <iostream>
#include <typeinfo>

class B {
public:
    virtual ~B() = default;
};

class D : public B {};
class E : public B {};

int main() {
    E e;
    B& b = e;

    try {
        D& d = dynamic_cast<D&>(b);
        (void)d;
        std::cout << 'a';
    } catch (const std::bad_cast&) {
        std::cout << 'b';
    }

    std::cout << "\n";
}
