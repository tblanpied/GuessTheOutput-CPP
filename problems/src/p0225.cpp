#include <iostream>

class S {
    int v;
public:
    explicit S(int x) : v(x) {}
    explicit operator bool() const {
        std::cout << 'b';
        return v != 0;
    }
};

int main() {
    S a(0);
    S b(1);

    if (a) std::cout << '1';
    else   std::cout << '0';

    if (b) std::cout << '1';
    else   std::cout << '0';

    std::cout << "\n";
}
